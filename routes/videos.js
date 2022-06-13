const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuid } = require('uuid');
const videoFile = fs.readFileSync('./data/videos.json');

router.route('/') 
        .get((req, res) => {
            
        const videos = JSON.parse(videoFile);

        res.json(videos)
    }).post((req, res) => {
        const newVideo = {
            title: req.body.title,
            channel: 'BrainStation',
            image: 'http://localhost:9000/images/Upload-video-preview.jpg',
            description: req.body.description,
            views: '10',
            likes: '4',
            duration: '5:00',
            video: '',
            timestamp: Date.now(),
            comments: [],
            id: uuid()
        };

        const videos = JSON.parse(videoFile);

        let allVideos = [...videos, newVideo];
        
        fs.writeFileSync('./data/videos.json', JSON.stringify(allVideos))

        res.status(201).json(newVideo);
    })
    
router.get("/:videoId", (req, res) => {

    const videos = JSON.parse(videoFile);

    const individualVideo = videos.find((video) => video.id === req.params.videoId);

    if (!individualVideo) {
        res.status(404).send("Video not found")
        return;
    }
        
    res.json(individualVideo);
});

module.exports = router;