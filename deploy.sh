#!/bin/bash

check () {
  retval=$1
  if [ $retval -ne 0 ]; then
      >&2 echo "Return code was not zero but $retval"
      exit 999
  fi
}

#last commit message:
MESSAGE=$(git log -1 --pretty=%B)
echo Last commit message is "'"$MESSAGE"'"
RELEASE_DIR="$HOME/transempregos-portal-release"
if [ -d "$RELEASE_DIR" ]; then
    echo Deleting release dir "'"$RELEASE_DIR"'"...
    rm -rf "$RELEASE_DIR"
fi
echo Cloning to "'"$RELEASE_DIR"'"...
git clone --depth 1 git@github.com:TransEmpregos/transempregos-portal-release.git "$RELEASE_DIR"
check $?
echo Deleting old files...
cd $RELEASE_DIR
shopt -s extglob
rm !(.git|.|..) -rf
check $?
echo Copying release files from "'"$SNAP_WORKING_DIR"'" to "'"$RELEASE_DIR"'"...
mkdir dist
cp -R "$SNAP_WORKING_DIR/dist/." "$RELEASE_DIR/dist/"
cp "$SNAP_WORKING_DIR/package.json" "$RELEASE_DIR/package.json"
check $?
echo Adding files to git...
git add -A
check $?
echo Committing...
git commit -m "#$SNAP_PIPELINE_COUNTER $MESSAGE

Original commit: $SNAP_COMMIT
On Branch: $SNAP_BRANCH"
check $?
echo Pushing files to git...
git push origin master
check $?