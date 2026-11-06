#!/usr/bin/env bash
# Build the image on this machine, ship it to the Coolify box's private registry,
# point the Coolify app at it and redeploy. The box is short on CPU and memory,
# so images are never built there.
#
#   COOLIFY_TOKEN=... scripts/deploy.sh
#
# Needs: Docker, an `ssh coolify` host alias for the box, and a Coolify API token.
set -euo pipefail
cd "$(dirname "$0")/.."

APP_UUID=${APP_UUID:-idkrnoym6c0jyyml7ylt5y4u}
SITE_URL=${SITE_URL:-https://www.foldyfriends.com}
: "${COOLIFY_TOKEN:?set COOLIFY_TOKEN}"

if [ -n "$(git status --porcelain)" ]; then
  echo "commit or stash your changes first" >&2
  exit 1
fi
SHA=$(git rev-parse --short HEAD)

echo "building foldy-friends:$SHA for linux/arm64"
docker build --platform linux/arm64 --build-arg SITE_URL="$SITE_URL" -t "foldy-friends:$SHA" .

echo "shipping to the box"
docker save "foldy-friends:$SHA" | gzip -1 | ssh coolify "gunzip | docker load"
ssh coolify "docker tag foldy-friends:$SHA localhost:5000/foldy-friends:$SHA \
  && docker push -q localhost:5000/foldy-friends:$SHA && docker rmi foldy-friends:$SHA >/dev/null"

api() {
  ssh coolify "curl -sf -X $1 -H 'Authorization: Bearer $COOLIFY_TOKEN' -H 'Content-Type: application/json' \
    --data-binary @- http://localhost:8000/api/v1$2" <<<"${3:-}"
}
api PATCH "/applications/$APP_UUID" "{\"docker_registry_image_tag\":\"$SHA\"}" >/dev/null
api POST /deploy "{\"uuid\":\"$APP_UUID\",\"force\":false}"
echo
echo "deploy of $SHA queued; watch it in Coolify"
