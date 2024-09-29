# Contribution Guidelines

We are thrilled to welcome contributors to the **Leadlly Mentor Mobile App**! Below are the guidelines to help you contribute efficiently.

## 📚 Getting Started

### Prerequisites

- **Expo CLI**: Follow the [Expo CLI installation guide](https://docs.expo.dev/more/expo-cli/).
- **Node.js** (>= 14.x.x)
- **npm** (or **yarn**)
- **Android Studio** or **Xcode** (if testing on an emulator).
- **Expo Go App** (if testing on a physical device).
- **Set up the Leadlly Mentor Backend**: To set up, follow this guide [Leadlly Mentor API Setup Guide](https://github.com/Leadlly/leadlly.mentor.api/blob/main/README.md).

### Installation

1. **Fork and clone the repository**:
    ```bash
    git clone https://github.com/{your-username}/leadlly.mentor.mobileapp.git
    cd leadlly.mentor.mobileapp
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the root directory with the following variables:
    ```bash
    EXPO_PUBLIC_STUDENT_API_BASE_URL=<hosted-ngrok-url>
    EXPO_PUBLIC_GOOGLE_CLIENT_ID=<your-google-client-id>
    ```

    ***Resources***:
    - **Ngrok**: Expose your local mentor backend server online to use in the app. Refer to [this guide](https://ngrok.com/docs/getting-started/) for detailed instructions.
    - **Google Client ID**: To generate Google Client ID and Google Client Secret, follow [this guide](https://support.google.com/cloud/answer/6158849?hl=en) to set up your credentials using the Google Cloud Console.

4. **Start the Leadlly Mentor API**:

    Follow the [Leadlly Mentor API Setup Guide](https://github.com/leadlly/leadlly.mentor.api/blob/main/README.md) to install and run the backend locally.

5. **Run the app**:

    - For **Expo Go (physical devices)**: 
        ```bash
        npm start
        ```
        Then scan the QR code from the Metro Bundler using your **Expo Go App**.

        <img width="313" alt="Screenshot 2024-09-29 at 5 33 21 PM" src="https://github.com/user-attachments/assets/cebf07e2-68f5-4d3f-98ff-6cfa56767060">

    - For **Android Emulator**:
        ```bash
        npm start
        a
        ```
    
    - For **iOS Emulator**:
        ```bash
        npm start
        i
        ```

    - For **Web**:
        ```bash
        npm run web
        ```

## 🎯 How to Contribute

We welcome contributions! If you'd like to help improve the Leadlly Mentor Mobile App, follow these steps:

1. **Fork the repository**.
2. **Create a new branch** for your feature or bugfix.
3. **Make your changes**.
4. **Open a pull request** and describe your changes.

## 🐛 Reporting Issues

If you encounter any issues while using the app, feel free to [open an issue](https://github.com/leadlly/leadlly.mentor.mobileapp/issues). Please provide detailed information to help us address the problem quickly.

## 💻 Code Quality

- Follow the existing coding style and ensure your code passes linting checks.
- Write meaningful commit messages that describe your changes clearly.
- Ensure your pull request references the relevant issue number.

## 🚩 Bug Fixes and Features

- Before working on major changes, open an issue to discuss them with the maintainers.
- Tag your pull request with relevant labels, such as "bugfix" or "feature".

## ⚙️ Pull Request Reviews

Pull requests will be reviewed, and feedback will be provided as soon as possible. Please be patient and address any requested changes.

## 🌍 Community Guidelines

- **Be Respectful**: Treat everyone with respect, and always be courteous in your interactions.
- **Collaborate**: Help others by reviewing code, suggesting improvements, or answering questions.
- **Learn and Share**: Open source is about learning together, so don't hesitate to ask questions or share knowledge.

## 💬 Contribution Process

- To indicate you're working on an issue, comment "I am working on this issue." Our team will verify your activity. If there is no response after a reasonable time, the issue may be reassigned.
- Please do not claim issues that are already assigned to someone else.

## 📞 Contact

For any further questions or support, reach out to us at:
- **Email**: [support@leadlly.in](mailto:support@leadlly.in)
- **Website**: [Leadlly.in](https://leadlly.in)
