document.addEventListener('DOMContentLoaded', () => {

    // Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // --- Dynamic Terminal Logic ---
    const terminalContent = document.getElementById('terminal-content');
    if (!terminalContent) {
        console.error("Terminal content element not found!");
        return;
    }

    const terminalScenarios = [
        { lines: [ { type: 'prompt', text: 'terraform plan -out=tfplan' }, { type: 'output', text: 'Refreshing state... Reading...'}, { type: 'output', text: 'Plan: 1 to add, 0 to change, 0 to destroy.'}, { type: 'success', text: 'Terraform plan saved to tfplan.' } ] },
        { lines: [ { type: 'prompt', text: 'docker build -t my-app:latest .' }, { type: 'output', text: 'Sending build context to Docker daemon...'}, { type: 'output', text: 'Step 1/4 : FROM node:18-alpine'}, { type: 'output', text: 'Step 2/4 : WORKDIR /app'}, { type: 'success', text: 'Successfully built 4b1c2b8c2d9a'} ] },
        { lines: [ { type: 'prompt', text: 'git push origin main' }, { type: 'output', text: 'Enumerating objects: 5, done.'}, { type: 'output', text: 'To github.com:johndoe/my-repo.git'}, { type: 'success', text: '✓ Push successful!'} ] }
    ];

    let scenarioIndex = 0;
    const typingSpeed = 30;
    const lineDelay = 300;
    const scenarioDelay = 5000;

    function typeText(element, text) {
        return new Promise(resolve => {
            let i = 0;
            const interval = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(interval);
                    resolve();
                }
            }, typingSpeed);
        });
    }

    async function runScenarios() {
        while (true) {
            const scenario = terminalScenarios[scenarioIndex];
            for (const lineData of scenario.lines) {
                const lineElement = document.createElement('div');
                lineElement.className = `line line-${lineData.type}`;
                terminalContent.appendChild(lineElement);

                if (lineData.type === 'prompt') {
                    const promptSign = document.createElement('span');
                    promptSign.textContent = '$';
                    const commandText = document.createElement('span');
                    lineElement.appendChild(promptSign);
                    lineElement.appendChild(commandText);
                    await typeText(commandText, lineData.text);
                } else {
                    await typeText(lineElement, lineData.text);
                }

                terminalContent.scrollTop = terminalContent.scrollHeight;
                await new Promise(resolve => setTimeout(resolve, lineDelay));
            }

            await new Promise(resolve => setTimeout(resolve, scenarioDelay));
            scenarioIndex = (scenarioIndex + 1) % terminalScenarios.length;
            terminalContent.innerHTML = '';
        }
    }

    runScenarios();
});