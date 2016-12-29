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
RELEASE_DIR=$HOME/transempregos-portal-release
echo Cloning to $RELEASE_DIR
git clone git@github.com:TransEmpregos/transempregos-portal-release.git $RELEASE_DIR
check $?
echo Deleting old files...
cd $RELEASE_DIR
find . -path ./.git -prune -o -exec rm -rf {} \; 2> /dev/null
check $?
echo Copying release files...
cp -R $SNAP_WORKING_DIR/dist/. $RELEASE_DIR/
check $?
git add -A
check $?
git commit -m $MESSAGE
check $?
git push origin master
check $?