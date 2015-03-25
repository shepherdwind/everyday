BIN := ./node_modules/.bin
REPORTER ?= spec
SRC = $(wildcard src/*.js)
TESTS = $(wildcard test/**/*test.js)

MOCA_OPT =

install:
	@npm install

build:
	@$(BIN)/babel src --out-dir lib --copy-files

test: install
	@node --es_staging $(BIN)/_mocha \
		--reporter $(REPORTER) \
		--require should \
		--timeout 5s \
		$(MOCA_OPT) \
		$(TESTS)

clean:
	@rm -rf build

.PHONY: test clean
