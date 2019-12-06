import React, { createContext, useContext, useEffect, useState } from "react";
import { geocodingClient } from "~/services/mapbox/mapbox";

const locationContext = createContext({ location: undefined });

const useMapbox = () => {
  const [state, setState] = useState({
    location: undefined,
    initializing: true,
  });

  const resolveLocation = () => {
    if (process.browser) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          geocodingClient
            .reverseGeocode({
              query: [pos.coords.longitude, pos.coords.latitude],
              mode: "mapbox.places",
              types: ["place"],
              limit: 1,
            })
            .send()
            .then(response => {
              const match = response.body;
              setState({ location: match, initializing: false });
            });
        });
      } else {
        console.info("Geolocation Service Unavailable");
        setState({ location: undefined, initializing: false });
      }
    }
  };

  useEffect(() => {
    resolveLocation();
  }, []);

  return state;
};

export const LocationProvider = locationContext.Provider;
export const LocationConsumer = locationContext.Consumer;

export const LocationContext = ({ children }) => {
  const { initializing, location } = useMapbox();

  if (initializing) {
    console.info("Determining location...");
  } else {
    console.info("Location Determined.");
  }

  return <LocationProvider value={{ location }}>{children}</LocationProvider>;
};

//^ Hook for grabbing location without consumer component
export const useLocation = () => {
  const { location } = useContext(locationContext);
  return { location };
};
