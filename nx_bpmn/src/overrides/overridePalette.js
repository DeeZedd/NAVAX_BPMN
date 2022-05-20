export default function CustomPaletteProvider(palette) {
    palette.registerProvider(this);

    this.getPaletteEntries = function(element) {
        return {};
    };
}

CustomPaletteProvider.$inject = [ 'palette' ];