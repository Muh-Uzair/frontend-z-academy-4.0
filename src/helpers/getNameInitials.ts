export function getNameInitials(fullName: string): string {
    if (!fullName || typeof fullName !== 'string') {
        return '';
    }

    // Split by spaces and filter out empty strings
    const nameParts = fullName.trim().split(/\s+/);

    if (nameParts.length === 0) {
        return '';
    }

    // Take first letter of first name
    let initials = nameParts[0][0].toUpperCase();

    // If there is a second name, take its first letter too
    if (nameParts.length >= 2) {
        initials += nameParts[1][0].toUpperCase();
    }

    return initials;
}