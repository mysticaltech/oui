# Contributing to OUI

OUI is an open source repo where anyone can contribute, and only Optimizely employees have permission to create an npm release.

## :pushpin: Install & Run

Requires [Node](https://nodejs.org/en/download/) and [Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable)

1. `git clone git@github.com:optimizely/oui.git && cd oui`
2. `yarn install`

Then you can run and develop locally:

- `yarn storybook` - launch React Storybook locally and watch assets
- `yarn build-storybook` - build static Storybook for documentation
- `yarn test` - test code for syntax errors

### :bulb: Adopt Storybook Driven Development

Storybook is the best way to learn about, play with, prototype, and build OUI components. Storybook runs locally and will watch for component and documentation updates. Visit http://storybooks-official.netlify.com/ for inspiration on all that is possible!

Every component should contain prop definitions and a robust set of Storybook examples (stories). This will allow for quicker adoption and help Storybook to serve as the best hub for OUI technical documentation. **If you create or update a component, it shouldn't be considered finished until you've completed the following:**

1. Run Storybook and watch assets via `yarn storybook`
2. Copy or reference the Story format of the [DatePicker](./src/components/DatePicker) component
3. Include accurate `propType` configurations and comments, as well as `defaultProps` if applicable (these details are pulled into the _show info_ section)
4. Create multiple stories to accurately showcase your new/updated component and its various states. When applicable, include [knobs](https://github.com/storybookjs/storybook/blob/master/addons/knobs/README.md) in your story to help others understand the different configurations of props.

## ʦ Typescript

Typescript is enabled (_but not required_) in this repo. Typescript is a superset of Javascript which is used to enforce static typing of an otherwise untyped dynamic language. It can be a little confusing at first, so here are some tips for developing with Typescript:

#### Ease yourself in

Writing plain javascript (ES5/6/7/latest) in `.ts/.tsx` files works totally fine. You can slowly introduce Typescript typings more and more as you get more familiar.

### Look at Examples

Chances are whatever you're trying to type, someone else has typed it before! There are a myriad of examples and support questions on the internet due to the widespread adoption of Typescript. Google around and you'll likely find excellent help.

When it comes to React components, typing can get a little tricky, but fortunately, React itself has excellent Typescript support. Check out the following resources for extensive examples of React Typing:

**[React Basic]** - https://github.com/typescript-cheatsheets/react-typescript-cheatsheet#basic-cheatsheet-table-of-contents

**[React Advanced]** - https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/blob/master/ADVANCED.md

**[React HOC]** - https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/blob/master/HOC.md

#### Additional Resources:

**[Typescript in 5min]** - https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html

**[Typescript Handbook]** - https://www.typescriptlang.org/docs/handbook/basic-types.html

**[Justification - Why Typescript?]** - https://medium.com/@jtomaszewski/why-typescript-is-the-best-way-to-write-front-end-in-2019-feb855f9b164

### //@ts-ignore and `:any`

Don't let Typescript errors slow down your development if you don't want them to. Use `//@ts-ignore` to tell the Typescript compiler to ignore the next line, or specify a type as `:any` if you can't figure out why the compiler is complaining to you. Typescript is fun once you get a hang of it, but sometimes you just wanna see if your code works and come back to typing it later.

## :pencil: Develop

1. Create branch: `git checkout -b username/branch-name`
2. Make and commit your changes
3. Update `CHANGELOG.md` and note your changes directly under "Unreleased":

   ```md
   ## Unreleased

   - [Release/Feature/Patch] Describe your change here. Component names are in **bold** and prop names are in `monospace` ([#GITHUB_ISSUE](Link to github issue))
   ```

   > **Note:** please do not create a new version number header, this is done only during release.

4. Verify your OUI changes work as expected in the Optimizely repo.

   Use yarn link:

   ```sh
   cd ~/projects/optimizely-oui          # go into package directory
   nvm use                               # ensure you are using the correct version specified in .nvmrc
   yarn watch                            # build your oui folder so that your latest changes are included in the linked module
   yarn link                             # in a new shell, create global link to OUI
   cd ./node_modules/react && yarn link  # create global link for OUI's React
   cd ~/projects/optly                   # go into some other package directory that consumes OUI
   yarn link optimizely-oui react        # installs your local package and OUI's React instead of a versioned module pulled from npm
   ```

   Each time you make code changes you will need to manually run `yarn build` again to ensure your linked module is updated with your latest OUI code changes.

5. If you've added a **_NEW_** React component to `src/components`, add it to the public component interface (`src/main.js`) **_and_** the type definition file (`types/templates/module-declaration.d.ts`). This makes consumers aware of the component and it's types.
6. Regenerate Typescript definitions by running `yarn generate-types` (for React component changes)
7. `git push` your changes to GitHub
8. [Open a pull request](https://github.com/optimizely/oui/compare) of your branch, add at least one reviewer
9. Review the results of Chromatic's visual regression tests. See below for [more info about VRT](#-using-chromatic-visual-regression-testing-vrt)
10. Once you've merged your PR, please follow the instructions to [Release a New Version](https://github.com/optimizely/oui/blob/devel/CONTRIBUTING.md#ship-release-a-new-version), including updating the version in the monolith.

### ✅ Using Chromatic Visual Regression Testing (VRT)

Each pull request will automatically trigger a build in Chromatic to visually test every Storybook story. After the checks finish running on your PR, be sure to address any discrepancies in Chromatic, either by accepting the new snapshot (thus making it the new baseline) or denying the change and fixing any issues in your PR. For more information, refer to the [Chromatic documentation](https://docs.chromaticqa.com/).

#### Disabling Chromatic for a Story

Sometimes you don't want Chromatic to run on a particular story, either because you are expecting changes or the story is repetitive. In this case, you can use a parameter on the story to disable chromatic:

```
stories.addParameters({ chromatic: { disable: true } });
```

#### VRT for Dates

OUI includes [mockdate](https://github.com/boblauer/MockDate), a library that allows you to override the current system date temporarily, ensuring VRT doesn't fail due to using date changes. See the [Storybook config](https://github.com/optimizely/oui/blob/b331684d50206a8a979dffc23d3081b7c34333c0/.storybook/config.js) for the implementation.

## :ship: Release a New Version

Both UI Engineers and the Frontend team have permission to release OUI via `yarn version --xxxxx`:

1. Get latest code: `git checkout devel && git pull && git checkout master && git pull`
2. Merge your changes: `git merge devel`
3. Build static Storybook documentation for this release: `yarn build-storybook`
4. Add a new header to `CHANGELOG.md` under “Unreleased” with the [new version number](https://medium.com/design-optimizely/how-to-version-your-ui-library-1c7a1b7ee23a):

   ```md
   ## Unreleased

   ## 31.0.0 - 2018-04-13

   - [Release] Added a cool breaking change. (#999)
   ```

5. Commit to master: `git add . && git commit -a -m 'Prep for new release version x.y.z'`
   - You'll be committing the CHANGELOG file and the new Storybook iframe.html and bundle
6. Run one of these depending on the highest importance issue this release:
   - `[Patch]` changes: `yarn version --patch`
   - `[Feature]` changes: `yarn version --minor`
   - `[Release]` changes: `yarn version --major`
7. [Create a new release on GitHub](https://github.com/optimizely/oui/releases/new):
   - Select the new tag version
   - Leave “Release title” blank
   - Paste in new release contributions from the `CHANGELOG.md` release notes section from step 3 above into the Description field
   - Click Publish Release
8. Check for updated package on NPM
   - Check [NPM](https://www.npmjs.com/package/optimizely-oui) for the updated release
   - If it seems to stall, check [travis](https://travis-ci.org/optimizely/oui/builds) and make sure no errors occurred
9. Bump the OUI version number in Optimizely's [`package.json`](https://github.com/optimizely/optimizely/blob/devel/src/www/frontend/package.json).
   - Within the Optimizely repo run `yarn upgrade optimizely-oui@99.xx.xx` (note to include the major version number e.g. `99.`, leaving the minor and patch numbers as `xx.xx`) which updates `yarn.lock` and `package.json`
     - If you notice that your yarn commands are removing the integrity shas inside the yarn.lock file, your yarn version needs an upgrade
     - Make sure to run `yarn-deduplicate yarn.lock` after the upgrade. [yarn-deduplicate](https://github.com/atlassian/yarn-deduplicate)
   - Make a PR that links to the OUI release and includes the new release contributions from the `CHANGELOG.md` release notes section
10. You're done :sunglasses:
