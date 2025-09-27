/**
 * Simple placeholder API for QR/Barcode scanning.
 * Uses camera stream as capability check and returns a manual input fallback
 * since no heavy scanning library is included to keep template lightweight.
 */

// PUBLIC_INTERFACE
export async function openScanPrompt() {
  /** Opens a prompt to simulate scanning, tries to request camera first */
  try {
    if (navigator.mediaDevices?.getUserMedia) {
      await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    }
  } catch (e) {
    // ignore, fallback to input
  }
  const code = prompt('Enter scanned code (simulate QR/Barcode):');
  if (!code) return null;
  return code.trim();
}
