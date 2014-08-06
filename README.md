pjs-logger
======

Mostly wraps [loglevel](https://github.com/pimterry/loglevel).

But integrates well with the existing pjs-player project. 

```javascript
var logger = new Logger("MyLogger");
logger.trace("log statement", obj);
logger.debug("log statement",);
logger.log("log statement"); // same as debug
logger.info("log statement");
logger.warn("log statement");
logger.error("log statement");
```
