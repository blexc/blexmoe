#! /bin/sh
# Copies entire site needed for neocities. Drag and drop everything from
# DEPLOYPATH to neocities site. Don't drag and drop folders. Drag files only.

DEPLOYPATH=neocities_copypaste
mkdir -p $DEPLOYPATH
cp *.html $DEPLOYPATH
cp *.css $DEPLOYPATH
cp -R js $DEPLOYPATH
cp -R images $DEPLOYPATH
cp -R misc $DEPLOYPATH
