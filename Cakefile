util = require './index.js'

test_spec = () ->
  util.sh './node_modules/.bin/mocha --colors test/*_spec.* test/**/*_spec.*'

test_promises = (cb)->
  util.sh './node_modules/.bin/promises-aplus-tests ./test/promise_aplus_adapter.js --colors', cb

task 'test', "Run all tests", -> test_promises test_spec
task 'test:spec', "Run spec tests", -> test_spec()
task 'test:promises', "Run promise a+ tests against deferred.js", -> test_promises()
