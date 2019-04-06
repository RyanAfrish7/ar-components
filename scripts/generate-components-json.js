/* eslint-disable no-console */
const fs = require("fs").promises;
const path = require("path");

// eslint-disable-next-line import/no-extraneous-dependencies
const args = require("minimist")(process.argv);

async function generatePackagesJson(packagesDirectory, outputDirectory) {
    const rootPackageJson = await fs.readFile("package.json", "utf8")
        .then(packageJson => JSON.parse(packageJson));

    const packages = (await Promise.all(
        (await fs.readdir(packagesDirectory))
            .map(async directory => ({
                directory,
                content: JSON.parse(await fs.readFile(path.join(packagesDirectory, directory, "package.json"), "utf8")),
            })),
    ))
        .map(({ content: packageJson, directory }) => ({
            ...packageJson,
            shortName: packageJson.name.replace(/^@.+\//, ""),
            repository: {
                ...rootPackageJson.repository,
                directory,
            },
            repositoryUrl: `${rootPackageJson.repository.url.replace(/^git\+/, "").replace(/\.git/, "")}/tree/master/packages/${directory}`,
        }));

    if (outputDirectory) {
        await fs.writeFile(path.join(outputDirectory, "components.json"), JSON.stringify(packages), "utf8");
    } else {
        console.log(packages);
    }
}

const packagesDirectory = args._.pop();

generatePackagesJson(path.resolve(packagesDirectory), path.resolve(args.out)).then(() => {
    console.log("generation completed. ");
}).catch((error) => {
    console.error("generation failed. ", error);
});
