Events = require '../lib/events.js'

CONTINUATION_DELAY_MS = 0

TEST_KEY = 'a_key'

describe 'Events', ->

  it 'should call subscribers when an emit is posted to the same key', (done)->
    list = new Events()
    eventSpy = sinon.spy()

    first_continuation = ()->
      setTimeout(()->
        assert(eventSpy.called, 'eventSpy.called')
        done()
      , CONTINUATION_DELAY_MS)

    list.on TEST_KEY, eventSpy
    list.on TEST_KEY, first_continuation

    list.emit TEST_KEY

  it 'should unsubscribe without affecting other subscriptions', (done)->
    list = new Events()
    eventSpy = sinon.spy()

    first_continuation_called = false
    first_continuation = ()->
      assert(
        (first_continuation_called = !first_continuation_called),
        'first_continuation should only be called once'
      )
      setTimeout(()->
        assert(eventSpy.calledOnce, 'first emit')
        list.on TEST_KEY, second_continuation

        list.off TEST_KEY, eventSpy
        list.off TEST_KEY, first_continuation
        list.emit TEST_KEY
      , CONTINUATION_DELAY_MS)

    second_continuation = ()->
      setTimeout(()->
        assert(eventSpy.calledOnce, 'no second emit for eventSpy')
        list.off TEST_KEY, second_continuation

        assert.lengthOf(list._eventSubscribers[TEST_KEY], 0, 'nothing should be left')
        done()
      , CONTINUATION_DELAY_MS)

    list.on TEST_KEY, eventSpy
    list.on TEST_KEY, first_continuation

    list.emit TEST_KEY
