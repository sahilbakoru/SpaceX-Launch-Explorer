# SpaceX Launch Explorer
| Launches        | Explore       |
|---------------------------|-------------------------------|
| ![Launches](https://github.com/user-attachments/assets/d4f3f046-6e9c-4a45-a0c5-1ca72b5ebe96)   | ![Explore](https://github.com/user-attachments/assets/1d20afcd-7eef-45b5-b618-ae5e53384747)        |


## Map Implementation

### Libraries Used
- **expo-location** - Device location services and permissions
- **expo-linking** - Opening native Maps applications
- **lucide-react-native** - Map and navigation icons

### Map Features
- **Visual Map Placeholder**: Custom map view showing launchpad coordinates and location details
- **Distance Calculation**: Haversine formula implementation for accurate distance between user and launchpad
- **Native Maps Integration**: Platform-specific deep linking to Apple Maps (iOS) and Google Maps (Android)
- **Directions Support**: One-tap navigation with user location as starting point

### Implementation Details
```typescript
// Distance calculation using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2): number

// Platform-specific maps opening
function openNativeMaps(latitude, longitude, label?, userLocation?)
```

## Permission Flows

### Location Permission Handling

#### Permission States
- **Granted**: Full location access, shows distance and enables directions
- **Denied**: Clear error message with retry option
- **Web Platform**: Graceful fallback with "not available" message

#### Permission Flow
1. **Initial Check**: App checks existing permission status on mount
2. **User Request**: "Get My Location" button triggers permission request
3. **Permission Prompt**: Native system dialog appears
4. **Response Handling**:
   - ✅ **Granted**: Fetch current location and calculate distance
   - ❌ **Denied**: Show error state with clear messaging
   - 🔄 **Retry**: User can tap button again to re-request

#### Error Handling
- Permission denied: "Location permission denied"
- Location fetch failed: Specific error message from system
- Web platform: "Location services not available on web"
- Network issues: Graceful degradation with retry option

#### UX Considerations
- **Progressive Enhancement**: App works without location, enhanced with it
- **Clear CTAs**: "Get My Location" and "Open in Maps" buttons
- **Visual Feedback**: Loading states, error states, and success indicators
- **Fallback Support**: Maps open even without user location (destination-only)

### Code Structure
```typescript
// Custom hook for location management
useLocation() {
  location, loading, error, permissionStatus, requestLocation
}

// MapView component handles all map-related UI
<MapView 
  launchpad={launchpad}
  userLocation={location}
  onRequestLocation={requestLocation}
  locationError={error}
/>
```
