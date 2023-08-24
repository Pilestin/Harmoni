SelectedMusic = new ReactiveVar(null);

Template.registerHelper(
    'selectedMusicUtil', function() {
        return SelectedMusic;
    }
)