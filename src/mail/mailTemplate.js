const emailTemplate = (username) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Our Blog Community</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 20px;
            background-color: #4CAF50;
            color: #ffffff;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }
        .header h1 {
            margin: 0;
        }
        .content {
            padding: 20px;
            line-height: 1.6;
        }
        .content h2 {
            color: #4CAF50;
        }
        .footer {
            text-align: center;
            padding: 10px;
            background-color: #f4f4f4;
            color: #777;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            background-color: #4CAF50;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to Our Blog Community!</h1>
        </div>
        <div class="content">
            <h2>Hello ${username},</h2>
            <p>We're thrilled to have you join our vibrant community of bloggers and readers. Whether you're here to share your stories, gain insights, or simply enjoy reading, we're excited to have you on board.</p>
            <p>Here's what you can do next:</p>
            <ul>
                <li>Explore trending posts and discover new topics.</li>
                <li>Engage with other community members by commenting and sharing posts.</li>
                <li>Start writing your own blog posts and share your thoughts with the world.</li>
            </ul>
            <p>To get started, click the button below:</p>
            // link to website
            <a href="https://www.google.com" class="button">Get Started</a>
            <p>If you have any questions, feel free to Contact to this email or visit our <a href="https://www.google.com">Support</a>.</p>
            <p>Happy blogging!</p>
            <p>Best regards,<br>The Blog Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Blog. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

module.exports = emailTemplate;
