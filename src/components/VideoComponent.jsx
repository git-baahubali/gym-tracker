import React, { useRef, useEffect } from 'react';
import * as posenet from '@tensorflow-models/posenet';

const VideoComponent = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const modelRef = useRef(null);

    // camera setup
  useEffect(() => {
    // Access the user's webcam
    async function setupCamera() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    }

    setupCamera();
  }, []);

  useEffect(() => {
    // Load the PoseNet model
    async function loadModel() {
      modelRef.current = await posenet.load();
      // You can now set up your pose detection
    }

    loadModel();
  }, []);


  // Pose detection function
  const detectPose = async () => {
    if (modelRef.current && videoRef.current && canvasRef.current) {
      const pose = await modelRef.current.estimateSinglePose(videoRef.current, {
        flipHorizontal: true,
      });
      drawPose(pose);
    }
  };

  // Draw the detected pose on the canvas
  const drawPose = (pose) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // Draw keypoints and skeleton here using pose data
    // ...
  };

  // Start the pose detection loop
  useEffect(() => {
    let animationFrameId;

    const detect = async () => {
      await detectPose();
      animationFrameId = requestAnimationFrame(detect);
    };

    detect();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} style={{ width: '600px', height: '500px' }} />
      <canvas ref={canvasRef} width="600" height="500" />
    </div>
  );
};

export default VideoComponent;
