set -ev
if [[ $TRAVIS_EVENT_TYPE != 'pull_request' ||  $TRAVIS_PULL_REQUEST_SLUG != $TRAVIS_REPO_SLUG ]];
then
  CHROMATIC_APP_CODE=$CHROMATIC_APP_CODE npm run chromatic
fi