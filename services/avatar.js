/**
 * Returns url of avatar using adorable.io avatar service
 * @param  {String}  identifier Identifier used to generate avatar.
 * @param  {Integer} size       Pixel size of avatar.
 * @return {String}             Url for avatar.
 */
module.exports.getAvatar = function (identifier, size) {
  return 'http://api.adorable.io/avatar/' + (size || 285) + '/' + identifier + '.png';
}