var express = require('express'),
    http = require('http'),
    app = express(),
    opts = require(__dirname + '/config/opts.js');

console.log('RUNNING: ', __dirname);
// Load express configuration
require(__dirname + '/config/env.js')(express, app);

// Load routes
require(__dirname + '/routes')(app);

//******INCLUDE NATURAL JAVASCRIPT NLP EXAMPLES********
console.log('NATURAL NLP EXAMPLES:');
//https://github.com/NaturalNode/natural
//*****************************************************
console.log('TOKENIZATION:')
//*****************************************************
var natural = require('natural');
var tokenizer = new natural.WordTokenizer();
console.log(tokenizer.tokenize("your dog has fleas."));
// [ 'your', 'dog', 'has', 'fleas' ]

tokenizer = new natural.TreebankWordTokenizer();
console.log(tokenizer.tokenize("my dog hasn't any fleas."));
// [ 'my', 'dog', 'has', 'n\'t', 'any', 'fleas', '.' ]

tokenizer = new natural.RegexpTokenizer({pattern: /\-/});
console.log(tokenizer.tokenize("flea-dog"));
// [ 'flea', 'dog' ]

tokenizer = new natural.WordPunctTokenizer();
console.log(tokenizer.tokenize("my dog hasn't any fleas."));
// [ 'my',  'dog',  'hasn',  '\'',  't',  'any',  'fleas',  '.' ]

//*********************************
console.log('STRINGDISTILLATION');
//********************************
console.log(natural.JaroWinklerDistance("dixon","dicksonx"))
console.log(natural.JaroWinklerDistance('not', 'same'));
//0.746666
//0
console.log(natural.LevenshteinDistance("ones","onez"));
console.log(natural.LevenshteinDistance('one', 'one'));
//1
//0
console.log(natural.DiceCoefficient('thing', 'thing'));
console.log(natural.DiceCoefficient('not', 'same'));
//1
//0

//*********************************
console.log('STEMATICIZE');
//********************************
console.log(natural.PorterStemmer.stem("words")); // stem a single word
natural.PorterStemmer.attach();
console.log("i am waking up to the sounds of chainsaws".tokenizeAndStem());
console.log("chainsaws".stem());
natural.LancasterStemmer.attach();
console.log("i am waking up to the sounds of chainsaws".tokenizeAndStem());
console.log("chainsaws".stem());


//*********************************
console.log('CLASSIFICATION');
//********************************
var classifier = new natural.BayesClassifier();
//You can train the classifier on sample text. It will use reasonable defaults to tokenize and stem the text.
classifier.addDocument('i am long qqqq', 'buy');
classifier.addDocument('buy the q\'s', 'buy');
classifier.addDocument('short gold', 'sell');
classifier.addDocument('sell gold', 'sell');
classifier.train();

//You have access to the set of matched classes and the associated value from the classifier.
console.log(classifier.classify('i am short silver'));
//"sell"
console.log(classifier.classify('i am long copper'));
//"buy"

console.log(classifier.getClassifications('i am long copper'));
//[ { label: 'buy', value: 0.39999999999999997 },
//  { label: 'sell', value: 0.19999999999999998 } ]

//The classifier can also be trained with and can classify arrays of tokens, strings, or any mixture of the two. Arrays let you use entirely custom data with your own tokenization/stemming, if you choose to implement it.
classifier.addDocument(['sell', 'gold'], 'sell');
classifier.events.on('trainedWithDocument', function (obj) {
   console.log('CLASSIFIER TRAINING:')
   console.log(obj);
   /* {
   *   total: 23 // There are 23 total documents being trained against
   *   index: 12 // The index/number of the document that's just been trained against
   *   doc: {...} // The document that has just been indexed
   */ 
});

//A classifier can also be persisted and recalled so you can reuse a training
classifier.save('classifier.json', function(err, classifier) {
	console.log('CLASSIFIER SAVE:');
    // the classifier is saved to the classifier.json file!
});
//To recall from the classifier.json saved above:
natural.BayesClassifier.load('classifier.json', null, function(err, classifier) {
	console.log('LOADING CLASSIFIER JSON:');
    console.log(classifier.classify('long SUNW'));  //long
    console.log(classifier.classify('short SUNW')); //short
});
//A classifier can also be serialized and deserialized like so:
var classifier = new natural.BayesClassifier();
classifier.addDocument(['sell', 'gold'], 'sell');
classifier.addDocument(['buy', 'silver'], 'buy');

// serialize
var raw = JSON.stringify(classifier);
console.log('RAW', raw);
// deserialize
//var restoredClassifier = natural.BayesClassifier.restore(JSON.parse(raw));
//console.log(restoredClassifier.classify('i should sell that'));

//*****************************************************
console.log('PHONETICIZATION:')
//*****************************************************
var metaphone = natural.Metaphone;
var soundEx = natural.SoundEx;
// ***************************
var wordA = 'phonetics';
var wordB = 'fonetix';
// ***************************
if(metaphone.compare(wordA, wordB))
    console.log('they sound alike!');
//Raw Phonetics in process.
console.log(metaphone.process('phonetics'));
//FNTKS
// Maximum length 3
console.log(metaphone.process('phonetics', 3));
//FNT

//DoubleMetaphone deals with two encodings returned in an array. This feature is experimental and subject to change:
var dm = natural.DoubleMetaphone;
var encodings = dm.process('Matrix');
console.log(encodings[0]);
console.log(encodings[1]);
//MTRKS
//MTRKS
//**************************
metaphone.attach();
if(wordA.soundsLike(wordB))
    console.log('they sound similar!');
console.log('phonetics'.phonetics());
//FNTKS
console.log('phonetics rock'.tokenizeAndPhoneticize());
//[ 'FNTKS', 'RK' ]
if(soundEx.compare(wordA, wordB))
    console.log('they sound alike!');
soundEx.attach();
if(wordA.soundsLike(wordB))
    console.log('they sound alike!');
console.log('phonetics'.phonetics());
//P532

//*****************************************************
console.log('INFLECTIZATION:')
//*****************************************************
var nounInflector = new natural.NounInflector();
console.log(nounInflector.pluralize('radius'));
//radii
console.log(nounInflector.singularize('beers'));
//beer
var verbInflector = new natural.PresentVerbInflector();
console.log(verbInflector.singularize('become'));
//becomes
console.log(verbInflector.pluralize('becomes'));
//become

//*****************************************************
console.log('NGRAMINIZATION:')
//*****************************************************
var NGrams = natural.NGrams;
console.log(NGrams.bigrams('some words here'));
console.log(NGrams.bigrams(['some',  'words',  'here']));
// [ [ 'some', 'words' ], [ 'words', 'here' ] ]
console.log(NGrams.trigrams('some other words here'));
console.log(NGrams.trigrams(['some',  'other', 'words',  'here']));
//[ [ 'some', 'other', 'words' ], [ 'other', 'words', 'here' ] ]
console.log(NGrams.ngrams('some other words here for you', 4));
console.log(NGrams.ngrams(['some', 'other', 'words', 'here', 'for','you'], 4));
//[ [ 'some', 'other', 'words', 'here' ], [ 'other', 'words', 'here', 'for' ], [ 'words', 'here', 'for', 'you' ] ]
console.log(NGrams.ngrams('some other words here for you', 4, '[start]', '[end]'));
/*[ [ '[start]', '[start]', '[start]', 'some' ],
  [ '[start]', '[start]', 'some', 'other' ],
  [ '[start]', 'some', 'other', 'words' ],
  [ 'some', 'other', 'words', 'here' ],
  [ 'other', 'words', 'here', 'for' ],
  [ 'words', 'here', 'for', 'you' ],
  [ 'here', 'for', 'you', '[end]' ],
  [ 'for', 'you', '[end]', '[end]' ],
  [ 'you', '[end]', '[end]', '[end]' ] ] */
  console.log(NGrams.ngrams('some other words here for you', 4, null, '[end]'));
  /* [ [ 'some', 'other', 'words', 'here' ],
  [ 'other', 'words', 'here', 'for' ],
  [ 'words', 'here', 'for', 'you' ],
  [ 'here', 'for', 'you', '[end]' ],
  [ 'for', 'you', '[end]', '[end]' ],
  [ 'you', '[end]', '[end]', '[end]' ] ]*/

//*****************************************************
console.log('TRIETIZATION:')
//*****************************************************
//Tries are a very efficient data structure used for prefix-based searches. 
//Natural comes packaged with a basic Trie implementation which can support match collection along a path, existence search and prefix search.
var Trie = natural.Trie;
var trie = new Trie();
// Add one string at a time
trie.addString("test");
// Or add many strings
trie.addStrings(["string1", "string2", "string3"]);
//contains
console.log(trie.contains("test")); // true
console.log(trie.contains("asdf")); // false
//prefix
console.log(trie.findPrefix("tester"));     // ['test', 'er']
console.log(trie.findPrefix("string4"));    // [null, '4']
console.log(trie.findPrefix("string3"));    // ['string3', '']
//On Path.
trie.addString("tes");
trie.addString("est");
console.log(trie.findMatchesOnPath("tester")); // ['tes', 'test'];
//Prefix Path
console.log(trie.keysWithPrefix("string")); // ["string1", "string2", "string3"]
//SUFFIX???
//Case Sensitivity
trie.contains("TEST"); // false
var ciTrie = new Trie(false);
ciTrie.addString("test");
ciTrie.contains("TEsT"); // true

//****************************************
// https://github.com/spencermountain/nlp_compromise
//****************************************
var Tags = {
  "verb":{
    "VB" : "verb, generic (eat)",
    "VBD" : "past-tense verb (ate)",
    "VBN" : "past-participle verb (eaten)",
    "VBP" : "infinitive verb (eat)",
    "VBZ" : "present-tense verb (eats, swims)",
    "VBF" : "future-tense verb (will eat)",
    "CP" : "copula (is, was, were)",
    "VBG" : "gerund verb (eating,winning)"},
  "adjective":{
    "JJ" : "adjective, generic (big, nice)",
    "JJR" : "comparative adjective (bigger, cooler)",
    "JJS" : "superlative adjective (biggest, fattest)"},
  "adverb":{
    "RB" : "adverb (quickly, softly)",
    "RBR" : "comparative adverb (faster, cooler)",
    "RBS" : "superlative adverb (fastest (driving), coolest (looking))"},
  "noun":{
    "NN" : "noun, singular (dog, rain)",
    "NNP" : "singular proper noun (Edinburgh, skateboard)",
    "NNPA" : "noun, acronym (FBI)",
    "NNAB" : "noun, abbreviation (jr.)",
    "NNPS" : "plural proper noun (Smiths)",
    "NNS" : "plural noun (dogs, foxes)",
    "NNO" : "possessive noun (spencer's, sam's)",
    "NG" : "gerund noun (eating,winning, but used grammatically as a noun)",
    "PRP" : "personal pronoun (I,you,she)",
    "PP" : "possessive pronoun (my,one's)"},
  "glue":{
    "FW" : "foreign word (mon dieu, voila)",
    "IN" : "preposition (of,in,by)",
    "MD" : "modal verb (can,should)",
    "CC" : "co-ordating conjunction (and,but,or)",
    "DT" : "determiner (the,some)",
    "UH" : "interjection (oh, oops)",
    "EX" : "existential there (there)"},
  "value":{
    "CD" : "cardinal value, generic (one, two, june 5th)",
    "DA" : "date (june 5th, 1998)",
    "NU" : "number (89, half-million)" }
};
    console.log('TAGS: ', Tags);


//****************************************
// START BOOTSTRAP SERVER: localhost:3000
//****************************************
http.createServer(app).listen(opts.port, function () {
    console.log("Express server listening on port %d in %s mode",
                opts.port, app.settings.env);
});

console.log("SERVER RUNNING on: http://localhost:3000/");