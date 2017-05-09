/**
 * Breaks long words using hyphens - useful because Chrome still doesn't support
 * CSS3 hyphens
 * Usage:
 * <div hyphens>Text that may contain long words</div>
 */

// character limit for hyphenation
const THRESHOLD = 10;
const SEPARATOR = '&shy;';

angular.module('hyphens')
.directive('hyphens', (): ng.IDirective => ({
    restrict: 'E',
    scope: {
        text: '=',
    },
    replace: true,
    template: '<span title="{{text}}" ng-bind-html="hyphenated"></span>',
    controller: ['$scope',
        ($scope: any): void => {
            function hyphens(text: string): string {
                const words = text.split(' ');
                return words.map((word: string) => {
                    if (word.length > THRESHOLD) {
                        const hyphenLocation = Math.min(THRESHOLD - 1, word.length / 2);
                        return word.substr(0, hyphenLocation) + SEPARATOR + hyphens(
                            word.substr(hyphenLocation)
                        );
                    }
                    return word;
                }).join(' ');
            }
            $scope.hyphenated = hyphens($scope.text);
        }
    ]
}));
