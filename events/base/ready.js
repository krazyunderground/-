module.exports = {
    name: "ready",
    once: "true",
    async execute(Discord, client){
        client.user.setActivity("ENGLISH ONLY")
        console.log(`Logged in as ${client.user.tag}`)
    }
}