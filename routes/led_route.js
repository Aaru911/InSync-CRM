const app = global.router
const http = require('http');
const { authMiddleware } = require('../middleware/auth.js');

//--------------------LED ROUTE(On Going work)--------------------//
app.get('/led', authMiddleware, async (req, res) => {
  let IOT_data = '';

  const timeout = 5000; // 5 seconds
  const timer = setTimeout(() => {
    console.error('Request timed out');
    res.render('led');
  }, timeout);

  http.get("http://" + process.env.IOT1, (resp) => {
    clearTimeout(timer);
    let IOT_data = '';
    resp.on('data', (chunk) => {
      IOT_data += chunk;
    });
    resp.on('end', () => {
      res.render('led', { data: IOT_data });
    });
  }).on('error', (err) => {
    clearTimeout(timer);
    console.error(err);
    res.render('led');
  });
});

// app.post('/led',authMiddleware, async (req, res) => {
//     action1=req.body.led1;
//     action2=req.body.led2;
//     action3=req.body.led3;
//     if (action1 === 'on') {
//       await http.get("http://"+process.env.IOT1+"/led1?action=on", (resp) => {});
//     } else{
//       await http.get("http://"+process.env.IOT1+"/led1?action=off", (resp) => {});
//     }
//     if (action2 === 'on') {
//       await http.get("http://"+process.env.IOT1+"/led2?action=on", (resp) => {});
//     } else{
//       await http.get("http://"+process.env.IOT1+"/led2?action=off", (resp) => {});
//     }
//     if (action3 === 'on') {
//       await http.get("http://"+process.env.IOT1+"/led3?action=on", (resp) => {});
//     } else{
//       await http.get("http://"+process.env.IOT1+"/led3?action=off", (resp) => {});
//     }
//     res.redirect('/led');
// });

app.get('/led/status', authMiddleware, async (req, res) => {
  var IOT_data = '';
  http.get("http://" + process.env.IOT1, (resp) => {
    IOT_data = '';
    resp.on('data', (chunk) => {
      IOT_data += chunk;
    });
    resp.on('end', () => {
      // Convert binary values to text
      IOT_data = IOT_data.replace(/0/g, 'off');
      console.log(IOT_data);
      res.json(IOT_data);
    });
  });
});

router.post('/led', async (req, res) => {
  const action1 = req.body.led1;
  const action2 = req.body.led2;
  const num = [];
  const actions = [];
  if (action1 === 'on') {
    num[0] = '1';
  } else {
    num[0] = '0';
  }
  if (action2 === 'on') {
    num[1] = '1';
  } else {
    num[1] = '0';
  }

  // Construct an array of promises for HTTP requests
  num.forEach((val, index) => {
    const action = val === '1' ? 'on' : 'off';
    actions.push(new Promise((resolve, reject) => {
      http.get(`http://` + process.env.IOT1 + `/led${index + 1}?action=${action}`, (resp) => {
        resolve();
      }).on('error', (err) => {
        reject(err);
      });
    }));
  });

  try {
    await Promise.all(actions);
    res.redirect('/led');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error processing requests');
  }
});

module.exports = app;