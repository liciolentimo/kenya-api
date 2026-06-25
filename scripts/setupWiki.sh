#!/bin/bash
# One-time script to push wiki-content/ into the actual GitHub Wiki repository.
#
# PREREQUISITE: You must first visit your repo's Wiki tab on GitHub.com and
# click "Create the first page" ONCE manually — this initializes the wiki git
# repository. Without this step, the wiki repo does not exist and cloning will fail.

set -e

REPO_URL=$(git config --get remote.origin.url)
WIKI_URL="${REPO_URL%.git}.wiki.git"

echo "📖 Cloning wiki repo: $WIKI_URL"
git clone "$WIKI_URL" /tmp/kenyaapi-wiki

echo "📋 Copying wiki content..."
cp wiki-content/*.md /tmp/kenyaapi-wiki/

cd /tmp/kenyaapi-wiki
git add .
git commit -m "docs: populate wiki with full content"
git push

echo "✅ Wiki published! View it at:"
echo "${REPO_URL%.git}/wiki"

cd -
rm -rf /tmp/kenyaapi-wiki
