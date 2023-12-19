# Todo List

I think that every beginner and more advanced developer has made a todo list at some point. I believe that this type of project done using various technologies allows you to consolidate your knowledge of certain issues that are also useful in more advanced projects.

I created the entire project in React. To style the components, I used Styled Components and, of course, variables and general classes declared in the main css file. My database was json-server and @tanstack/react-query v5 together with Axios was responsible for downloading, uploading, editing and deleting data. Thanks to react-router-dom, I was able to configure my application in a simple and transparent way. I used the loader from react-router-dom to first download data from the database and deliver it to the user. The Loader was also useful for downloading the website's theme (which I placed in localStorage), which I provided and which the user could use depending on his preferences. To display notifications, I used react-toastify, which I adapted to a specific theme.

## Core Tech Stack

[![My Skills](https://skillicons.dev/icons?i=js,react,html,css)](https://skillicons.dev)

# Other Tech Stack

- @tanstack/react-query
- react-router-dom
- react-toastify
- styled-components
- json-server
- axios
- nanoid

## Features

- Saving, deleting, editing each todo, including updating to the database
- Possibility to set a todo as completed.
- Changing the website theme to light or dark depending on user preferences, saving the theme to localStorage.
- Responsive website adapted to use on any device.
- Notifying the user about performed actions using react-toastify.

## Screenshots

![App Screenshot](https://i.imgur.com/bYs0pG3.png)
<br>
