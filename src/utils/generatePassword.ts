export default function generatePassword(size = 12): string {
    const bytes = new Uint8Array(size);
    crypto.getRandomValues(bytes);
    return btoa(String.fromCharCode(...bytes)).substring(0, size);
}