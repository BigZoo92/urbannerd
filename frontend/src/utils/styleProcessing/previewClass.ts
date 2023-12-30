export const previewClass = (previews: string[]) => {
    const count = previews?.length || 0;
    switch (count) {
      case 1: return 'one-image';
      case 2: return 'two-images';
      case 3: return 'three-images';
      case 4: return 'four-images';
      default: return '';
    }
  }