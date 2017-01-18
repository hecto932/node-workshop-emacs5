var fs = require('fs')
var EventEmitter = require('events')
var util = require('util')
var inherits = util.inherits

function readFileText(name, callback) {
	process.nextTick(function(){
		var content = fs.readFileSync(name)
		callback(content.toString())
	})
}

// Mini Clase
function TextReader(name){
	EventEmitter.call(this)
	this.name = name
}

// Heredamos las propiedades de EvenetEmitter dentro de TextReader
inherits(TextReader, EventEmitter)

// Agregando una metodo en nuestra clase EMACS5
TextReader.prototype.read = function() {
	var self = this
	readFileText(this.name, function(content){
		self.emit('end', content)
	})
}

/*readFileText('./lorem.txt', function(content){
	console.log(content)
})*/

var reader = new TextReader('./lorem.txt')

reader.on('end', function(content) {
	console.log(content)
})

reader.read()

console.log('Hola Platzi')