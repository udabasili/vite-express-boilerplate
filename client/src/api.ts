export const getData = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/status');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};
