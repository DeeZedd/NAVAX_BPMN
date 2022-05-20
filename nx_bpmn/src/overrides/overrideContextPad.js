export default function CustomContextPadProvider(contextPad) {
  contextPad.registerProvider(this);

  this.getContextPadEntries = function(element) {
    // no entries, effectively disable the context pad
    return {};
  };
}

CustomContextPadProvider.$inject = [ 'contextPad' ];