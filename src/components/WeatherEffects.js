/**
 * WWI Tactical Game - Weather Effects Component
 * Visual overlays for rain, fog, snow, and atmospheric conditions
 */

import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions, Easing } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Weather types and their visual properties
const WEATHER_CONFIG = {
  clear: {
    particles: 0,
    overlay: 'transparent',
    overlayOpacity: 0,
  },
  rain: {
    particles: 100,
    overlay: '#1a2a3a',
    overlayOpacity: 0.3,
    particleColor: '#7a9ab4',
    particleWidth: 2,
    particleHeight: 20,
    speed: 800,
    angle: 15,
  },
  heavyRain: {
    particles: 200,
    overlay: '#0a1a2a',
    overlayOpacity: 0.45,
    particleColor: '#6a8aa4',
    particleWidth: 3,
    particleHeight: 30,
    speed: 500,
    angle: 20,
  },
  fog: {
    particles: 15,
    overlay: '#708090',
    overlayOpacity: 0.5,
    particleColor: '#a0a0a0',
    particleWidth: 150,
    particleHeight: 80,
    speed: 8000,
    angle: 0,
    blur: true,
  },
  snow: {
    particles: 80,
    overlay: '#e8f0f8',
    overlayOpacity: 0.15,
    particleColor: '#ffffff',
    particleWidth: 8,
    particleHeight: 8,
    speed: 3000,
    angle: 5,
    wobble: true,
  },
  heavySnow: {
    particles: 150,
    overlay: '#d0e0f0',
    overlayOpacity: 0.25,
    particleColor: '#ffffff',
    particleWidth: 10,
    particleHeight: 10,
    speed: 2000,
    angle: 10,
    wobble: true,
  },
  mud: {
    particles: 0,
    overlay: '#3a2a1a',
    overlayOpacity: 0.2,
  },
  dust: {
    particles: 30,
    overlay: '#8b7355',
    overlayOpacity: 0.25,
    particleColor: '#a08060',
    particleWidth: 20,
    particleHeight: 20,
    speed: 5000,
    angle: 0,
  },
  storm: {
    particles: 150,
    overlay: '#0a0a1a',
    overlayOpacity: 0.5,
    particleColor: '#6080a0',
    particleWidth: 3,
    particleHeight: 35,
    speed: 400,
    angle: 25,
    lightning: true,
  },
};

/**
 * Single weather particle component
 */
const WeatherParticle = ({ config, index, totalParticles }) => {
  const animValue = useRef(new Animated.Value(0)).current;
  const wobbleValue = useRef(new Animated.Value(0)).current;

  // Random starting position
  const startX = Math.random() * (SCREEN_WIDTH + 100) - 50;
  const delay = Math.random() * config.speed;
  const size = config.particleWidth + Math.random() * 4 - 2;

  useEffect(() => {
    // Main falling animation
    const animate = () => {
      animValue.setValue(0);
      Animated.timing(animValue, {
        toValue: 1,
        duration: config.speed + Math.random() * 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => animate());
    };

    const timeout = setTimeout(animate, delay);

    // Wobble animation for snow
    if (config.wobble) {
      const wobble = () => {
        Animated.sequence([
          Animated.timing(wobbleValue, {
            toValue: 1,
            duration: 1000 + Math.random() * 500,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(wobbleValue, {
            toValue: -1,
            duration: 1000 + Math.random() * 500,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]).start(() => wobble());
      };
      wobble();
    }

    return () => clearTimeout(timeout);
  }, []);

  const translateY = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, SCREEN_HEIGHT + 50],
  });

  const translateX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.tan((config.angle * Math.PI) / 180) * SCREEN_HEIGHT],
  });

  const wobbleX = config.wobble
    ? wobbleValue.interpolate({
        inputRange: [-1, 1],
        outputRange: [-15, 15],
      })
    : 0;

  const opacity = config.blur ? 0.3 + Math.random() * 0.3 : 0.6 + Math.random() * 0.4;

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          left: startX,
          width: config.blur ? size * 2 : size,
          height: config.particleHeight,
          backgroundColor: config.particleColor,
          borderRadius: config.blur ? size : config.particleWidth / 2,
          opacity,
          transform: [
            { translateY },
            { translateX },
            ...(config.wobble ? [{ translateX: wobbleX }] : []),
            { rotate: `${config.angle}deg` },
          ],
        },
      ]}
    />
  );
};

/**
 * Lightning flash effect for storms
 */
const LightningFlash = () => {
  const flashOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const triggerLightning = () => {
      // Random delay between 3-10 seconds
      const delay = 3000 + Math.random() * 7000;

      setTimeout(() => {
        // Quick flash sequence
        Animated.sequence([
          Animated.timing(flashOpacity, {
            toValue: 0.8,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(flashOpacity, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(flashOpacity, {
            toValue: 0.6,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(flashOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(() => triggerLightning());
      }, delay);
    };

    triggerLightning();
  }, []);

  return (
    <Animated.View
      style={[
        styles.lightning,
        {
          opacity: flashOpacity,
        },
      ]}
    />
  );
};

/**
 * Main Weather Effects component
 */
const WeatherEffects = ({ weather = 'clear', intensity = 1 }) => {
  const config = WEATHER_CONFIG[weather] || WEATHER_CONFIG.clear;
  const particleCount = Math.floor(config.particles * intensity);

  if (weather === 'clear' || particleCount === 0) {
    return null;
  }

  return (
    <View style={styles.container} pointerEvents="none">
      {/* Overlay tint */}
      <View
        style={[
          styles.overlay,
          {
            backgroundColor: config.overlay,
            opacity: config.overlayOpacity * intensity,
          },
        ]}
      />

      {/* Weather particles */}
      {Array.from({ length: particleCount }).map((_, index) => (
        <WeatherParticle
          key={`particle-${index}`}
          config={config}
          index={index}
          totalParticles={particleCount}
        />
      ))}

      {/* Lightning for storms */}
      {config.lightning && <LightningFlash />}
    </View>
  );
};

/**
 * Combat modifiers based on weather
 */
export const getWeatherModifiers = (weather) => {
  switch (weather) {
    case 'rain':
      return {
        accuracy: -10,
        movement: -1,
        visibility: -1,
        description: 'Rain reduces accuracy and movement',
      };
    case 'heavyRain':
      return {
        accuracy: -20,
        movement: -2,
        visibility: -2,
        description: 'Heavy rain severely impacts combat',
      };
    case 'fog':
      return {
        accuracy: -15,
        movement: 0,
        visibility: -3,
        rangeReduction: 2,
        description: 'Fog limits visibility and range',
      };
    case 'snow':
      return {
        accuracy: -5,
        movement: -1,
        visibility: -1,
        description: 'Snow slows movement slightly',
      };
    case 'heavySnow':
      return {
        accuracy: -15,
        movement: -2,
        visibility: -2,
        description: 'Heavy snow impairs all operations',
      };
    case 'mud':
      return {
        accuracy: 0,
        movement: -2,
        visibility: 0,
        description: 'Mud slows all ground movement',
      };
    case 'dust':
      return {
        accuracy: -10,
        movement: 0,
        visibility: -1,
        description: 'Dust clouds reduce accuracy',
      };
    case 'storm':
      return {
        accuracy: -25,
        movement: -2,
        visibility: -3,
        rangeReduction: 3,
        description: 'Storm conditions are treacherous',
      };
    default:
      return {
        accuracy: 0,
        movement: 0,
        visibility: 0,
        description: 'Clear weather - no modifiers',
      };
  }
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  particle: {
    position: 'absolute',
    top: 0,
  },
  lightning: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#ffffff',
  },
});

export default WeatherEffects;
