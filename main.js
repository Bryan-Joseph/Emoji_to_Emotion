var prediction1 = null;
var prediction2 = null;

Webcam.set({
    width: 390,
    height: 340,
    image_format: 'png',
    png_quality: 90
});

Webcam.attach('#camera')

function takeSnap() {
    Webcam.snap(img => {
        document.getElementById('result').innerHTML = `<img id="capturedImage" src="${img}">`;
    });
}

console.log(`ml5 version: ${ml5.version}`);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/TNugsR9A7/model.json',modelLoaded);

function modelLoaded() {
    console.log('model loaded succesfully');
}

function speak(){
    var synth = window.speechSynthesis;
    var speak1 = `The first prediction is ${prediction1}`;
    var speak2 = `And the second prediction is ${prediction2}`;

    var utter = new SpeechSynthesisUtterance(speak1 + speak2);
    synth.speak(utter);
}

function check(){
    var img = document.getElementById('capturedImage');
    classifier.classify(img,afterCheck);
}

function afterCheck(error,result){
    if (error) {
        console.error(error);
    }else {
        console.log(result);
        prediction1 = result[0].label;
        prediction2 = result[1].label;
        console.log(`prediction1 - ${prediction1} ;; prediction2 - ${prediction2}`);

        document.getElementById('result_emotion_name').innerHTML = prediction1;
        document.getElementById('result_emotion_name2').innerHTML = prediction2;

        if(prediction1 == 'happy'){
            document.getElementById('result_emoji').innerHTML = '&#128512;'
        }else if(prediction1 == 'sad'){
            document.getElementById('result_emoji').innerHTML = '&#128532;'
        }else if(prediction1 == 'angry'){
            document.getElementById('result_emoji').innerHTML = '&#128545;'
        }else if(prediction1 == 'suprised'){
            document.getElementById('result_emoji').innerHTML = '😮';
        }

        if(prediction2 == 'happy'){
            document.getElementById('result_emoji2').innerHTML = '&#128512;'
        }else if(prediction2 == 'sad'){
            document.getElementById('result_emoji2').innerHTML = '&#128532;'
        }else if(prediction2 == 'angry'){
            document.getElementById('result_emoji2').innerHTML = '&#128545;'
        }else if(prediction2 == 'suprised'){
            document.getElementById('result_emoji2').innerHTML = '😮';
        }

        speak();
    }
}


