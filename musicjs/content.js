//content.
//
//*****************************************************
console.log('INITIALIZE-CONTENT:')
//*****************************************************

var rock.content = [
// What do I want to say?
 'What do you got to say?',
'if you could say anything',
// just about anything
'the truth is thicker than wine',
// I would if you got the time.
'It happens all the time'
// To tell you whats on my mind
];

var roll.content = [
   'Everytime I give you a ring girl',
   'It always the same old thing girl',
   'you know what is on my mind ',
   'it happenin all the time'
];


// ... { say: null,}
// ... { any-thing: null }
// ... { time: null }
// ... { mind: null}

//... SWITCH it will take a configuration object and return an object of NLP aggregate. Primarily SocialPhrases.
// CONFIGURATIOON-OBJECT EXAMPLES:
//... SWITCH: What do I have to [say]?, 
//... REPEAT: [just about anything] (title)
//... CONJUNCTION: I would if you've got the time
//...  EXTENSION: To tellya whats [been, burnin] on my mind [girl, man, ]
//... OUTSECTION, RETURN, END.

// Cause whenever I give you a ring [RHYME]
// It is always the same old thing.  [RHYME]
//just about every time 

// So here is what I'm trying to say
//...

// So I'm going to need a SONGLOOP.

// SONGLOOP
// I. COMPILATION
// II. TOKENIZATION
// III. RHYME
// IV. SOCIALPHRASE

// So what do I use to compilate?
console.log('LOAD LIBRARY:')
//*****************************************************
var IcIngATionAl = [ 'ic', 'ing', 'a', 'tion', 'al' , 'oo'] 

var SocialPhrase = [ 'It was Tragic', 'Like a boomerang', 'ahh', 'got the notion' ] 

var Animism = [ 'Ahh', 'Yeah', 'Nanana', 'Yo', 'Click', 'Bang', 'Boom'  ]

var Alternate = [ 'a', 'b']

var Repeat = function(){return 2}

//var natural = require('natural'),

//*****************************************************
console.log('TOKENIZE:')
//*****************************************************

var tokenizer = new natural.WordTokenizer()
for (i=0; i<4; i++){
	rock.tokens = tokenizer.tokenize(rock.content[i])
	roll.tokens = tokenizer.tokenize(roll.content[i])
}
// [ 'your', 'dog', 'has', 'fleas' ]

//*****************************************************
// ...BACKTOKEN
//*****************************************************
var BACKTOKEN = function (tokens){
	var backTokens [];
  returns backTokens;
}





