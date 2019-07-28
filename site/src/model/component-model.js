export default class ComponentModel {
    constructor({
        name,
        displayName,
        repository,
        version,
        description,
    }) {
        this.name = name;
        this.displayName = displayName;
        this.repository = repository;
        this.version = version;
        this.description = description;
    }

    getShortName() {
        return this.name.replace(/^@.+\//, "");
    }

    getRepositoryUrl() {
        return `${this.repository.url.replace(/.git$/, "")}/tree/master/${this.repository.directory}`;
    }
}
