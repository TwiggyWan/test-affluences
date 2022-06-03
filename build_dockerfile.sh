#!/bin/bash
set -euox pipefail
shopt -s inherit_errexit

#quick helper script to :
# lint the dockerfile
# build it
# clean intermediary stages
# usage : [INSTCMD="argument"] [IMAGENAME="img_name"] ./build_dockerfile.sh


# INSTCMD overrides the project install command, useful to swap between npm install and npm ci.
readonly INSTCMD="npm ci"

readonly IMAGENAME="affluences"

docker pull hadolint/hadolint
docker run --rm -i hadolint/hadolint < "$(dirname "$(realpath "$0")")"/Dockerfile

# docker build --build-arg "installCommand=\"$installCmd\"" -t affluences .
docker build --build-arg installCommand="$INSTCMD" -t "$IMAGENAME" .

docker rmi "$(docker images --filter label=name=affluences-todo --filter label=intermediate=true --quiet)"
