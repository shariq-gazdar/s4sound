# s4sound Song Application

## Overview

s4sound Song Application allows users to manage their favorite songs by interacting with a list of saved songs. Users can view, play, and remove songs from their favorites. The application leverages Firebase Firestore for data storage and retrieval.

---

## Features

- **View Favorite Songs**: Displays a list of favorite songs with thumbnails, titles, and channel names.
- **Play a Song**: Allows users to play a song by clicking on it.
- **Play All Songs**: Provides a "Play All" button to start playing songs sequentially.
- **Remove from Favorites**: Users can remove songs from their favorites list.
- **Dynamic Updates**: Favorites list updates dynamically with Firebase integration.

---

## Technologies Used

- **React**: For building the user interface.
- **Firebase Firestore**: For authentication and real-time database functionality.
- **React Router**: For navigation between pages.
- **Tailwind CSS**: For responsive and modern styling.
- **Youtube Data Api**: For getting and playing the songs.

---

## Installation and Setup

### Prerequisites

1. Node.js installed on your system.
2. Firebase account with a Firestore database set up.

### Steps

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
2. Navigate to the project directory:
   ```bash
   cd favorite-songs-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up Firebase configuration:
   - Replace `firebaseConfig` in `config/firebase.js` with your Firebase project configuration.
5. Start the development server:
   ```bash
   npm start
   ```

---

## File Structure

```
project-directory/
├── src/
│   ├── components/
│   │   ├── FavCards.js
│   │   ├── DownRow.js
│   ├── context/
│   │   ├── DbContext.js
│   ├── config/
│   │   ├── firebase.js
│   ├── assets/
│   │   ├── playerAssests/
│   │   │   ├── play.png
│   │   │   ├── fav_remove.png
│   │   │   ├── home.png
│   │   │   ├── favorite.png
│   ├── App.js
│   ├── index.js
├── public/
├── README.md
```

---

## Usage

1. **Home Page**: Displays the navigation and allows users to explore features.
2. **Favorites Page**: View and manage the list of favorite songs.
   - Click the **Play All** button to play all songs.
   - Click the **Remove** icon next to a song to remove it from favorites.

---

## Contributions

Feel free to contribute to the project by opening a pull request. Ensure your changes are well-documented and tested.

---

## Acknowledgments

Special thanks to:

- Firebase for providing an easy-to-use backend.
- React for its excellent component-based architecture.
- Tailwind CSS for fast and flexible styling.

## Download For Windows

https://www.mediafire.com/file/w1mxx388w58ijg9/s4sound_0.1.0_x64_en-US.msi/file , Download Now
