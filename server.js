const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files (HTML, JS, CSS) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the Nepal.geojson file
app.get('/map/:type', (req, res) => {
  const { type } = req.params;
  const validTypes = ['nepal', 'provinces', 'districts', 'municipalities', 'district_hqs', 'wards'];
  
  if (validTypes.includes(type)) {
    res.sendFile(path.join(__dirname, 'data', 'maps', `${type}.geojson`));
  } else {
    res.status(404).send('Map type not found');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
