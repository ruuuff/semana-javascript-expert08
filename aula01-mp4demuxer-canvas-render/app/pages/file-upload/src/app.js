import View from './view.js';
import Clock from './deps/clock.js';
const view = new View()
const clock = new Clock()

const worker = new Worker('./src/worker/worker.js', {
	type: 'module'
})

worker.onmessage = ({ data }) => {
	if (data.status !== 'done') return;
	clock.stop()
	view.updateElapsedTime(`Process took ${took.replace('ago', '')}`)
}

let took = ''
view.configureOnFileChange(file => {
	worker.postMessage({ file })
	
	clock.start((time) => {
		took = time;
		view.updateElapsedTime(`Process started ${time}`)
	})
})

async function fakeFetch() {
	const filePath = '/videos/frag_bunny.mp4'
	const response = await fetch(filePath)
    
	// Traz o tamanho do arquivo (com "method: 'HEAD'")
	// const response = await fetch(filePath, {
	//     method: "HEAD",
	// })
	// response.headers.get('content-length')
	// debugger

	const file = new File([await response.blob()], filePath, {
		type: 'vide/mp4',
		lastModified: Date.now()
	})

	const event = new Event('change')
	Reflect.defineProperty(
		event,
		'target',
		{ value: { files: [file] } }
	)

	document.getElementById('fileUpload').dispatchEvent(event)
}

fakeFetch()