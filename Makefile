install:
	npm ci

link:
	npm link

gendiff:
	node bin/gendiff.js

publish:
	npm publish --dry-run

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage

lint:
	npx eslint .