function loadEvents(client) {
    const ascii = require("ascii-table");
    const fs = require("node:fs");
    const path = require("node:path");
    const table = new ascii().setHeading("Events", "Status");

    const eventsPath = path.join(__dirname, '../events');

    const getDirectories = (path) => {
        return fs.readdirSync(path, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => path + '/' + dirent.name);
    }

    const eventDirectories = [eventsPath, ...getDirectories(eventsPath)];
    for (const dir of eventDirectories) {
        const eventFiles = fs.readdirSync(dir).filter(file => file.endsWith('.js'));
        for (const file of eventFiles) {
            const filePath = path.join(dir, file);
            const event = require(filePath);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args));
            } else {
                client.on(event.name, (...args) => event.execute(...args));
            }
            table.addRow(`${path.relative(eventsPath, dir)}/${file}`, "loaded");
        }
    }
    console.log(table.toString(), "\n Loaded events.");
}
  
module.exports = {loadEvents};