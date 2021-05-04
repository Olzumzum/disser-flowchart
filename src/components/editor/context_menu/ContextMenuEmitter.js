export const ContextMenuEmitter = {
    eventsContext: {},
    dispatch: function (event, data){
        if(!this.eventsContext[event]) return
        else {
            this.eventsContext[event].forEach(callback => callback(data))
        }
    },
    subscribe: function (event, callback){
        if(!this.eventsContext[event]) this.eventsContext[event] = []
        this.eventsContext[event].push(callback)
    }
}