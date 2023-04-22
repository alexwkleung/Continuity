# build (compile only)
.PHONY: build
build:
	npm run build

# resume (clean dist folder, compile, and run resume util)
.PHONY: resume
resume:
	npm run resume

# server (run local server)
.PHONY: server
server: 
	npm run server