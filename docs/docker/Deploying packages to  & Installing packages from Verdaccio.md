# Deploying packages to / Installing packages from Verdaccio

This tutorial assumes you already have the development environment setup built as per setup.md and assumes you have a package folder ready.

#### In you package folder

- Check and make sure there aren't any package-lock.json files or node_modules folder in your project folder. 
- Make sure your package is named as @pridevel/<package-name>. e.g. `@pridevel/authnform`
- Make sure the author is Pridevel and the License is MIT

Now, in your terminal, open your package folder,

```
npm addUser --registry http://localhost:9006/
Username: polysets
Password: password
Email: (this is public) <your-email>
Logged in as polysets on http://localhost:9006/.
```

Now you can publish your package with

```
npm publish --registry http://localhost:9006/
```

Once published, you can install this package by either running

```
npm install @pridevel/<package-name> --registry http://localhost:9006/
```

or by adding your package manually inside package.json of the destination project. 



Any further changes made to this package will require you to publish again onto Verdaccio for the changes to reflect. 

Before republishing you will either need to increment the version number, or run

```
npm unpublish @pridevel/<package-name> --registry http://localhost:9006/ --force
```

and then run the publish command.