webpackJsonp([2],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div style=\"padding-left:4ch; padding-top: 4ch\">\r\n\r\n    <input type=\"file\" (change)=\"fileSelected($event)\" placeholder=\"Select log file\" accept=\".log, .txt\">\r\n\r\n    <div id=\"instructions\" *ngIf=\"!resultsForPage\">\r\n        <h2>How to save a chatlog:</h2>\r\n        <ol>\r\n            <li>Enable chatlogs in game by using the command '/chatlog'</li>\r\n            <ul>\r\n                <li>This causes all text to be output to a file named 'chat.log', which by default is located at 'C:/Documents/Electronic\r\n                    Arts/Dark Age of Camelot</li>\r\n            </ul>\r\n            <li>You can write to a differently named file by using '/chatlog [name]'</li>\r\n            <ul>\r\n                <li>If the file [name].log exists, the game will open the file and append your chatlog to the end of it.</li>\r\n                <li>If the file [name].log doesn't exist, the game will create it for you</li>\r\n            </ul>\r\n            <li>Quitting, going link-dead, or typing /chatlog again will turn off the logging.</li>\r\n        </ol>\r\n    </div>\r\n\r\n    <div class=\"container-fluid\" *ngIf=\"resultsForPage\">\r\n        <div class=\"panel-group\">\r\n            <div class=\"row panel-default panel\" id=\"healing-money-summary\">\r\n                <h3 class=\"panel-heading\">Summary</h3>\r\n                <div class=\"panel-body\">\r\n                    <div class=\"col-sm-2\" id=\"healing-summary\">\r\n                        <h4>Healing</h4>\r\n                        <table style=\"border-top:1px solid black;\">\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>Delivered:</strong>\r\n                                </td>\r\n                                <td style=\"text-align: right\">{{resultsForPage.Healing.Delivered | number}}</td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>Received:</strong>\r\n                                </td>\r\n                                <td style=\"text-align: right\">{{resultsForPage.Healing.Received | number}}</td>\r\n                            </tr>\r\n                            <tr *ngIf=\"resultsForPage.Healing.Lifetapped\">\r\n                                <td>\r\n                                    <strong>Lifetapped:</strong>\r\n                                </td>\r\n                                <td style=\"text-align: right\">{{resultsForPage.Healing.Lifetapped | number}}</td>\r\n                            </tr>\r\n                        </table>\r\n                        <br/>\r\n                        <div *ngIf=\"resultsForPage.Healing.Targets.length\">\r\n                            <thead>\r\n                                <strong>Delivered breakdown:</strong>\r\n                            </thead>\r\n                            <div class=\"scrollTable\">\r\n                                <table class=\"table-striped scrollStriped\">\r\n                                    <tr>\r\n                                        <th></th>\r\n                                        <th style=\"text-align:center\">Count</th>\r\n                                        <th style=\"text-align:center\">Total</th>\r\n                                        <th style=\"text-align:right\">Max</th>\r\n                                    </tr>\r\n                                    <tr *ngFor=\"let target of resultsForPage.Healing.Targets\">\r\n                                        <td>\r\n                                            {{target[0]}}\r\n                                            <a *ngIf=\"checkIfNameIsPlayer(target[0])\" href=\"http://herald.uthgard.net/herald.php?view=stats&p1=player&p2=Player&p3=DESC&p5=Player&p6={{target[0]}}\" target=\"_blank\"> (herald)</a>\r\n                                        </td>\r\n                                        <td style=\"text-align:center\">{{target[1] | number}}</td>\r\n                                        <td style=\"text-align:center\">{{target[2] | number}}</td>\r\n                                        <td style=\"text-align:right\">{{target[3] | number}}</td>\r\n                                    </tr>\r\n                                </table>\r\n                            </div>\r\n                        </div>\r\n                        <br/>\r\n                        <div *ngIf=\"resultsForPage.Healing.Sources.length\">\r\n                            <thead>\r\n                                <strong>Received breakdown:</strong>\r\n                            </thead>\r\n                            <div class=\"scrollTable\">\r\n                                <table class=\"table-striped scrollStriped\">\r\n                                    <tr>\r\n                                        <th></th>\r\n                                        <th style=\"text-align:center\">Count</th>\r\n                                        <th style=\"text-align:center\">Total</th>\r\n                                        <th style=\"text-align:right\">Max</th>\r\n                                    </tr>\r\n                                    <tr *ngFor=\"let source of resultsForPage.Healing.Sources\">\r\n                                        <td>\r\n                                            {{source[0]}}\r\n                                            <a *ngIf=\"checkIfNameIsPlayer(source[0])\" href=\"http://herald.uthgard.net/herald.php?view=stats&p1=player&p2=Player&p3=DESC&p5=Player&p6={{source[0]}}\" target=\"_blank\"> (herald)</a>\r\n                                        </td>\r\n                                        <td style=\"text-align:center\">{{source[1] | number}}</td>\r\n                                        <td style=\"text-align:center\">{{source[2] | number}}</td>\r\n                                        <td style=\"text-align:right\">{{source[3] | number}}</td>\r\n                                    </tr>\r\n                                </table>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-sm-2\" id=\"rvr-summary\">\r\n                        <h4>RvR</h4>\r\n                        <table style=\"border-top:1px solid black;\">\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>Deaths:</strong>\r\n                                </td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.Summary.Deaths | number}}</td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>RPs:</strong>\r\n                                </td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.Summary.RPs | number}}</td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>Deathblows:</strong>\r\n                                </td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.Summary.DeathblowCount | number}}</td>\r\n                            </tr>\r\n                        </table>\r\n                        <br/>\r\n                        <thead>\r\n                            <strong>Deathblow list:</strong>\r\n                        </thead>\r\n                        <div class=\"scrollTable\" id=\"deathblow-list\" style=\"max-height:140px\">\r\n                            <table class=\"table-striped scrollStriped\">\r\n                                <tr *ngFor=\"let db of resultsForPage.Combat.Summary.DeathBlows\">\r\n                                    <td>\r\n                                        {{db[0]}}\r\n                                        <a *ngIf=\"checkIfNameIsPlayer(db[0])\" href=\"http://herald.uthgard.net/herald.php?view=stats&p1=player&p2=Player&p3=DESC&p5=Player&p6={{db[0]}}\" target=\"_blank\"> (herald)</a>\r\n                                    </td>\r\n                                    <td style=\"text-align:right\">{{db[1] | number}}</td>\r\n                                </tr>\r\n                            </table>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-sm-2\" id=\"money-summary\">\r\n                        <h4>Money</h4>\r\n                        <table style=\"border-top:1px solid black;\">\r\n                            <tr *ngIf=\"currencyPrintHelper(resultsForPage.Cash.Loot) != ''\">\r\n                                <td>\r\n                                    <strong>Looted:</strong>\r\n                                </td>\r\n                                <td style=\"text-align: right\">{{currencyPrintHelper(resultsForPage.Cash.Loot)}}</td>\r\n                            </tr>\r\n                            <tr *ngIf=\"currencyPrintHelper(resultsForPage.Cash.Expense) != ''\">\r\n                                <td>\r\n                                    <strong>Expenses:</strong>\r\n                                </td>\r\n                                <td style=\"text-align: right\">{{currencyPrintHelper(resultsForPage.Cash.Expense)}}</td>\r\n                            </tr>\r\n                            <tr *ngIf=\"currencyPrintHelper(resultsForPage.Cash.Income) != ''\">\r\n                                <td>\r\n                                    <strong>Income:</strong>\r\n                                </td>\r\n                                <td style=\"text-align: right\">{{currencyPrintHelper(resultsForPage.Cash.Income)}}</td>\r\n                            </tr>\r\n                        </table>\r\n                    </div>\r\n                    <div id=\"errors\" class=\"col-sm-4 panel-default\" style=\"max-height:250px; overflow-y:auto\">\r\n                        <h3>Errors:</h3>\r\n                        <div class=\"panel-body\">\r\n                            <ul>\r\n                                <li *ngFor=\"let todo of errorMessageList\">{{todo}}</li>\r\n                            </ul>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"row panel-default panel\" id=\"melee-attack\">\r\n                <h3 class=\"panel-heading\">Melee Attack</h3>\r\n                <div class=\"panel-body\">\r\n                    <div class=\"col-sm-2\" id=\"melee-summary\">\r\n                        <h4>\r\n                            <strong>Summary:</strong>\r\n                        </h4>\r\n                        <table class=\"table-striped striped\">\r\n                            <tr>\r\n                                <td></td>\r\n                                <th style=\"text-align:right\">Count</th>\r\n                                <th style=\"text-align:right\">Percent</th>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>Hit:</strong>\r\n                                </td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.MeleeAttack.Hits | number}}</td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.MeleeAttack.Percents.Hits | percent}}</td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>Blocked:</strong>\r\n                                </td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.MeleeAttack.Blocks | number}}</td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.MeleeAttack.Percents.Blocks | percent}}</td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>Parried:</strong>\r\n                                </td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.MeleeAttack.Parries | number}}</td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.MeleeAttack.Percents.Parries | percent}}</td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>Evaded:</strong>\r\n                                </td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.MeleeAttack.Evades | number}}</td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.MeleeAttack.Percents.Evades | percent}}</td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>Missed:</strong>\r\n                                </td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.MeleeAttack.Misses | number}}</td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.MeleeAttack.Percents.Misses | percent}}</td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>Bladeturned:</strong>\r\n                                </td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.MeleeAttack.Bladeturns | number}}</td>\r\n                                <td></td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>Fumbled:</strong>\r\n                                </td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.MeleeAttack.Fumbles | number}}</td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.MeleeAttack.Percents.Fumbles | percent}}</td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>Total Attacks:</strong>\r\n                                </td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.MeleeAttack.TotalAttacks | number}}</td>\r\n                                <td></td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>Base Dmg:</strong>\r\n                                </td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.MeleeAttack.BaseDamage | number}}</td>\r\n                                <td></td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>Dmg Absorbed:</strong>\r\n                                </td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.MeleeAttack.Absorbed | number}}</td>\r\n                                <td></td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>Crits:</strong>\r\n                                </td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.MeleeAttack.Crits | number}}</td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.MeleeAttack.Percents.Crits | percent}}</td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>Crit Dmg:</strong>\r\n                                </td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.MeleeAttack.CritDamage | number}}</td>\r\n                                <td></td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>Total Dmg:</strong>\r\n                                </td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.MeleeAttack.TotalDamage | number}}</td>\r\n                                <td></td>\r\n                            </tr>\r\n                        </table>\r\n                    </div>\r\n                    <div class=\"col-sm-4\" id=\"melee-target-breakdown\">\r\n                        <div *ngIf=\"resultsForPage.Combat.MeleeAttack.Targets.length\">\r\n                            <h4>\r\n                                <strong>Targets:</strong>\r\n                            </h4>\r\n                            <div class=\"scrollTable\" style=\"max-height:280px\">\r\n                                <table class=\"table-striped scrollStriped\">\r\n                                    <tr>\r\n                                        <th></th>\r\n                                        <th style=\"text-align:center\">Hits</th>\r\n                                        <th style=\"text-align:center\">Blocks</th>\r\n                                        <th style=\"text-align:center\">Parries</th>\r\n                                        <th style=\"text-align:center\">Evades</th>\r\n                                        <th style=\"text-align:right\">Dmg</th>\r\n                                    </tr>\r\n                                    <tr *ngFor=\"let dmgTarget of resultsForPage.Combat.MeleeAttack.Targets\">\r\n                                        <td>\r\n                                            {{dmgTarget[0]}}\r\n                                            <a *ngIf=\"checkIfNameIsPlayer(dmgTarget[0])\" href=\"http://herald.uthgard.net/herald.php?view=stats&p1=player&p2=Player&p3=DESC&p5=Player&p6={{dmgTarget[0]}}\" target=\"_blank\"> (herald)</a>\r\n                                        </td>\r\n                                        <td style=\"text-align:center\">{{dmgTarget[1] | number}}</td>\r\n                                        <td style=\"text-align:center\">{{dmgTarget[2] | number}}</td>\r\n                                        <td style=\"text-align:center\">{{dmgTarget[3] | number}}</td>\r\n                                        <td style=\"text-align:center\">{{dmgTarget[4] | number}}</td>\r\n                                        <td style=\"text-align:right\">{{dmgTarget[5] | number}}</td>\r\n                                    </tr>\r\n                                </table>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-sm-4\" id=\"melee-style-weapon-stats\">\r\n                        <div id=\"melee-style-stats\">\r\n                            <h4>\r\n                                <strong>Style Stats:</strong>\r\n                            </h4>\r\n                            <table class=\"table-striped scrollStriped\">\r\n                                <tr>\r\n                                    <th></th>\r\n                                    <th style=\"text-align:center\">Count</th>\r\n                                    <th style=\"text-align:center\">Avg GR</th>\r\n                                    <th style=\"text-align:center\">Total Dmg</th>\r\n                                    <th style=\"text-align:center\">Min</th>\r\n                                    <th style=\"text-align:right\">Max</th>\r\n                                    <th style=\"text-align:center\">Avg</th>\r\n                                </tr>\r\n                                <tr *ngFor=\"let style of resultsForPage.Combat.MeleeAttack.StyleStats\">\r\n                                    <td>{{style[0]}}</td>\r\n                                    <td style=\"text-align:center\">{{style[1] | number}}</td>\r\n                                    <td style=\"text-align:center\">{{style[2] | number}}</td>\r\n                                    <td style=\"text-align:center\">{{style[3] | number}}</td>\r\n                                    <td style=\"text-align:center\">{{style[4] | number}}</td>\r\n                                    <td style=\"text-align:right\">{{style[5] | number}}</td>\r\n                                    <td style=\"text-align:center\">{{style[3]/style[1] | number:'.0-0'}}</td>\r\n                                </tr>\r\n                            </table>\r\n                        </div>\r\n                        <br/>\r\n                        <br/>\r\n                        <div id=\"melee-weapon-stats\">\r\n                            <h4>\r\n                                <strong>Weapon Stats:</strong>\r\n                            </h4>\r\n                            <div class=\"scrollTable\">\r\n                                <table class=\"table-striped scrollStriped\">\r\n                                    <tr>\r\n                                        <th></th>\r\n                                        <th style=\"text-align:center\">Count</th>\r\n                                        <th style=\"text-align:center\">Dmg</th>\r\n                                        <th style=\"text-align:center\">Min</th>\r\n                                        <th style=\"text-align:center\">Max</th>\r\n                                        <th style=\"text-align:right\">Avg</th>\r\n                                    </tr>\r\n                                    <tr *ngFor=\"let style of resultsForPage.Combat.MeleeAttack.WeaponStats\">\r\n                                        <td>{{style[0]}}</td>\r\n                                        <td style=\"text-align:center\">{{style[1] | number}}</td>\r\n                                        <td style=\"text-align:center\">{{style[2] | number}}</td>\r\n                                        <td style=\"text-align:center\">{{style[3] | number}}</td>\r\n                                        <td style=\"text-align:center\">{{style[4] | number}}</td>\r\n                                        <td style=\"text-align:right\">{{style[2]/style[1] | number:'.0-0'}}</td>\r\n                                    </tr>\r\n                                </table>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"row panel panel-default\" id=\"caster-attack\">\r\n                <h3 class=\"panel-heading\">Caster Attack</h3>\r\n                <div class=\"panel-body\">\r\n                    <div class=\"col-sm-2\" id=\"caster-summary\">\r\n                        <h4>\r\n                            <strong>Summary:</strong>\r\n                        </h4>\r\n                        <table class=\"table-striped striped\">\r\n                            <tr>\r\n                                <th></th>\r\n                                <th style=\"text-align:right\">\r\n                                    <strong>Count</strong>\r\n                                </th>\r\n                                <th style=\"text-align:right\">\r\n                                    <strong>Percent</strong>\r\n                                </th>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>Hits:</strong>\r\n                                </td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.CasterAttack.Landed | number}}</td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.CasterAttack.Percents.Landed | percent}}</td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>Resists:</strong>\r\n                                </td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.CasterAttack.Resists | number}}</td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.CasterAttack.Percents.Resists | percent}}</td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>TotalAttacks:</strong>\r\n                                </td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.CasterAttack.TotalAttacks | number}}</td>\r\n                                <td></td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>Base Dmg:</strong>\r\n                                </td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.CasterAttack.BaseDamage | number}}</td>\r\n                                <td></td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>Crits:</strong>\r\n                                </td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.CasterAttack.Crits | number}}</td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.CasterAttack.Percents.Crits | percent}}</td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>Crit Dmg:</strong>\r\n                                </td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.CasterAttack.CritDamage | number}}</td>\r\n                                <td></td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>Total Dmg:</strong>\r\n                                </td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.CasterAttack.TotalDamage | number}}</td>\r\n                                <td></td>\r\n                            </tr>\r\n                        </table>\r\n                    </div>\r\n                    <div class=\"col-sm-4\" id=\"caster-damage-breakdown\">\r\n                        <div *ngIf=\"resultsForPage.Combat.CasterAttack.Targets.length\">\r\n                            <h4>\r\n                                <strong>Targets:</strong>\r\n                            </h4>\r\n                            <div class=\"scrollTable\">\r\n                                <table class=\"table-striped scrollStriped\">\r\n                                    <tr>\r\n                                        <th></th>\r\n                                        <th style=\"text-align:center\">Casted</th>\r\n                                        <th style=\"text-align:center\">Landed</th>\r\n                                        <th style=\"text-align:center\">Resisted</th>\r\n                                        <th style=\"text-align:center\">Crits</th>\r\n                                        <th style=\"text-align:right\">Total Dmg</th>\r\n                                    </tr>\r\n                                    <tr *ngFor=\"let dmgTarget of resultsForPage.Combat.CasterAttack.Targets\">\r\n                                        \r\n                                        <td>\r\n                                            {{dmgTarget[0]}}\r\n                                            <a *ngIf=\"checkIfNameIsPlayer(dmgTarget[0])\" href=\"http://herald.uthgard.net/herald.php?view=stats&p1=player&p2=Player&p3=DESC&p5=Player&p6={{dmgTarget[0]}}\" target=\"_blank\"> (herald)</a>\r\n                                        </td>\r\n                                        <td style=\"text-align:center\">{{dmgTarget[1] | number}}</td>\r\n                                        <td style=\"text-align:center\">{{dmgTarget[2] | number}}</td>\r\n                                        <td style=\"text-align:center\">{{dmgTarget[3] | number}}</td>\r\n                                        <td style=\"text-align:center\">{{dmgTarget[4] | number}}</td>\r\n                                        <td style=\"text-align:right\">{{dmgTarget[5] | number}}</td>\r\n                                    </tr>\r\n                                </table>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-sm-4\" id=\"caster-spell-stats\">\r\n                        <div *ngIf=\"resultsForPage.Combat.CasterAttack.SpellStats\">\r\n                            <h4>\r\n                                <strong>Spell Stats:</strong>\r\n                            </h4>\r\n                            <div class=\"scrollTable\" style=\"max-height:160px\">\r\n                                <table class=\"table-striped scrollStriped\">\r\n                                    <tr>\r\n                                        <th></th>\r\n                                        <th style=\"text-align:center\">Casted</th>\r\n                                        <th style=\"text-align:center\">Landed</th>\r\n                                        <th style=\"text-align:center\">Resisted</th>\r\n                                        <th style=\"text-align:center\">Crits</th>\r\n                                        <th style=\"text-align:right\">Total Dmg</th>\r\n                                    </tr>\r\n                                    <tr *ngFor=\"let spell of resultsForPage.Combat.CasterAttack.SpellStats\">\r\n                                        <td>{{spell[0]}}</td>\r\n                                        <td style=\"text-align:center\">{{spell[1] | number}}</td>\r\n                                        <td style=\"text-align:center\">{{spell[2] | number}}</td>\r\n                                        <td style=\"text-align:center\">{{spell[3] | number}}</td>\r\n                                        <td style=\"text-align:center\">{{spell[4] | number}}</td>\r\n                                        <td style=\"text-align:right\">{{spell[5] | number}}</td>\r\n                                    </tr>\r\n                                </table>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"row panel panel-default\" id=\"defense\">\r\n                <h3 class=\"panel-heading\">Defense</h3>\r\n                <div class=\"panel-body\">\r\n                    <div class=\"col-sm-2\" id=\"defense-summary\">\r\n                        <h4>\r\n                            <strong>Summary:</strong>\r\n                        </h4>\r\n                        <table class=\"table-striped striped\">\r\n                            <tr>\r\n                                <th></th>\r\n                                <th style=\"text-align: right\">\r\n                                    <strong>Count</strong>\r\n                                </th>\r\n                                <th style=\"text-align: right\">\r\n                                    <strong>Percent</strong>\r\n                                </th>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>Hits:</strong>\r\n                                </td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.Defense.Hits | number}}</td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.Defense.Percents.Hits | percent}}</td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>Blocks:</strong>\r\n                                </td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.Defense.Blocks | number}}</td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.Defense.Percents.Blocks | percent}}</td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>Parries:</strong>\r\n                                </td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.Defense.Parries | number}}</td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.Defense.Percents.Parries | percent}}</td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>Evades:</strong>\r\n                                </td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.Defense.Evades | number}}</td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.Defense.Percents.Evades | percent}}</td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>Misses:</strong>\r\n                                </td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.Defense.Misses | number}}</td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.Defense.Percents.Misses | percent}}</td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>Tot Melee Attacks:</strong>\r\n                                </td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.Defense.TotalMeleeAttacks | number}}</td>\r\n                                <td></td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>Crits:</strong>\r\n                                </td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.Defense.Crits | number}}</td>\r\n                                <td></td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>Crit Dmg:</strong>\r\n                                </td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.Defense.CritDamage | number}}</td>\r\n                                <td></td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>Melee Dmg:</strong>\r\n                                </td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.Defense.MeleeDamage | number}}</td>\r\n                                <td></td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>Dmg Absorbed:</strong>\r\n                                </td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.Defense.Absorbed | number}}</td>\r\n                                <td></td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>Spells/Procs:</strong>\r\n                                </td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.Defense.SpellsLanded | number}}</td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.Defense.Percents.SpellsLanded | percent}}</td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>Resists:</strong>\r\n                                </td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.Defense.Resists | number}}</td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.Defense.Percents.Resists | percent}}</td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>Tot Magic Attacks:</strong>\r\n                                </td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.Defense.TotalSpellAttacks | number}}</td>\r\n                                <td></td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>Spell Dmg:</strong>\r\n                                </td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.Defense.SpellDamage | number}}</td>\r\n                                <td></td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>\r\n                                    <strong>Total Dmg:</strong>\r\n                                </td>\r\n                                <td style=\"text-align:right\">{{resultsForPage.Combat.Defense.TotalDamage | number}}</td>\r\n                                <td></td>\r\n                            </tr>\r\n                        </table>\r\n                    </div>\r\n                    <div class=\"col-sm-5\" id=\"defense-damage-breakdown\">\r\n                        <div *ngIf=\"resultsForPage.Combat.Defense.Sources.length\">\r\n                            <h4>\r\n                                <strong>Damage Sources:</strong>\r\n                            </h4>\r\n                            <div class=\"scrollTable\" style=\"max-height:320px\">\r\n                                <table class=\"table-striped scrollStriped\">\r\n                                    <tr>\r\n                                        <th></th>\r\n                                        <th style=\"text-align:center\">Attacks</th>\r\n                                        <th style=\"text-align:center\">Hits</th>\r\n                                        <th style=\"text-align:center\">Blocks</th>\r\n                                        <th style=\"text-align:center\">Parries</th>\r\n                                        <th style=\"text-align:center\">Evades</th>\r\n                                        <th style=\"text-align:center\">Misses</th>\r\n                                        <th style=\"text-align:center\">Crits</th>\r\n                                        <th style=\"text-align:right\">Damage</th>\r\n                                    </tr>\r\n                                    <tr *ngFor=\"let dmgSource of resultsForPage.Combat.Defense.Sources\">\r\n                                        <td>\r\n                                            {{dmgSource[0]}}\r\n                                            <a *ngIf=\"checkIfNameIsPlayer(dmgSource[0])\" href=\"http://herald.uthgard.net/herald.php?view=stats&p1=player&p2=Player&p3=DESC&p5=Player&p6={{dmgSource[0]}}\" target=\"_blank\"> (herald)</a>\r\n                                        </td>\r\n                                        <td style=\"text-align:center\">{{dmgSource[1] | number}}</td>\r\n                                        <td style=\"text-align:center\">{{dmgSource[2] | number}}</td>\r\n                                        <td style=\"text-align:center\">{{dmgSource[3] | number}}</td>\r\n                                        <td style=\"text-align:center\">{{dmgSource[4] | number}}</td>\r\n                                        <td style=\"text-align:center\">{{dmgSource[5] | number}}</td>\r\n                                        <td style=\"text-align:center\">{{dmgSource[6] | number}}</td>\r\n                                        <td style=\"text-align:center\">{{dmgSource[7] | number}}</td>\r\n                                        <td style=\"text-align:right\">{{dmgSource[8] | number}}</td>\r\n                                    </tr>\r\n                                </table>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-sm-2\" id=\"defense-armor-hits\">\r\n                        <div *ngIf=\"resultsForPage.Combat.Defense.Hits > 0\">\r\n                            <h4>\r\n                                <strong>Armor Hits:</strong>\r\n                            </h4>\r\n                            <table class=\"table-striped striped\">\r\n                                <tr>\r\n                                    <th></th>\r\n                                    <th style=\"text-align: right\">Hits</th>\r\n                                    <th style=\"text-align: right\">Percent</th>\r\n                                    <th style=\"text-align: right\">Damage</th>\r\n                                </tr>\r\n                                <tr *ngFor=\"let armor of resultsForPage.Combat.Defense.ArmorHits\">\r\n                                    <td>{{armor[0]}}</td>\r\n                                    <td style=\"text-align: right\">{{armor[1] | number}}</td>\r\n                                    <td style=\"text-align: right\">{{(armor[1]/resultsForPage.Combat.Defense.Hits) | percent:'.0-2'}}</td>\r\n                                    <td style=\"text-align: right\">{{armor[2] | number}}</td>\r\n                                </tr>\r\n                            </table>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_parser_service__ = __webpack_require__("../../../../../src/app/services/parser.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(formBuilder, parserService) {
        this.formBuilder = formBuilder;
        this.parserService = parserService;
        this.fileExt = "TXT, LOG";
        this.todoList = [
            'Determine if bleed damage is distinct from proc/spell damage',
            'Wild healing?',
            'How is kill-count determined?',
            'Pet damage',
            'Style growth rates / dmg',
            'Unassigned crits',
        ];
        this.errorMessageList = [];
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent.prototype.fileSelected = function (event) {
        var _this = this;
        var fileList = event.target.files;
        var file = fileList[0];
        this.parserService.sendFileToParse(file)
            .subscribe(function (results) {
            var messages = results['Messages'];
            if (messages) {
                _this.errorMessageList = messages;
            }
            var castedResults = results['Results'];
            if (castedResults) {
                _this.resultsForPage = castedResults;
            }
        });
    };
    AppComponent.prototype.currencyPrintHelper = function (currency_dict) {
        var result_text = '';
        if (currency_dict[0] > 0) {
            result_text += currency_dict[0] + 'p ';
        }
        if (currency_dict[1] > 0) {
            result_text += currency_dict[1] + 'g ';
        }
        if (currency_dict[2] > 0) {
            result_text += currency_dict[2] + 's ';
        }
        if (currency_dict[3] > 0) {
            result_text += currency_dict[3] + 'c';
        }
        return result_text;
    };
    AppComponent.prototype.checkIfNameIsPlayer = function (name) {
        if (name.indexOf(' ') > -1) {
            return false;
        }
        if (name[0] != name[0].toUpperCase()) {
            return false;
        }
        return true;
    };
    return AppComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", String)
], AppComponent.prototype, "fileExt", void 0);
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_parser_service__["a" /* ParserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_parser_service__["a" /* ParserService */]) === "function" && _b || Object])
], AppComponent);

var _a, _b;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_file_drop__ = __webpack_require__("../../../../ngx-file-drop/ngx-file-drop.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_services_module__ = __webpack_require__("../../../../../src/app/services/services.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_3_ngx_file_drop__["a" /* FileDropModule */],
            __WEBPACK_IMPORTED_MODULE_5__services_services_module__["a" /* ServicesModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* HttpModule */]
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/services/http.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HttpService = (function () {
    function HttpService(http) {
        this.http = http;
    }
    HttpService.prototype.post = function (url, body, options) {
        return this.handleRequest(this.http.post(url, body, options));
    };
    HttpService.prototype.handleRequest = function (request) {
        var responseSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs__["Subject"]();
        var requestSubscription = request
            .subscribe(function (r) {
            responseSubject.next(r);
        }, function (err) {
            // this.handleError(err);
            responseSubject.error(err);
        }, function () {
            responseSubject.complete();
        });
        // Do not expose the ISubscription portion of Subject
        return responseSubject.asObservable();
    };
    return HttpService;
}());
HttpService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === "function" && _a || Object])
], HttpService);

var _a;
//# sourceMappingURL=http.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/parser.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__http_service__ = __webpack_require__("../../../../../src/app/services/http.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParserService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ParserService = (function () {
    function ParserService(httpService) {
        this.httpService = httpService;
    }
    ParserService.prototype.sendFileToParse = function (file) {
        var formData = new FormData();
        formData.append('logfile', file, file.name);
        var optHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        optHeaders.append('Accept', 'application/json');
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: optHeaders });
        return this.httpService.post(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].parserUploadUrl + "/upload", formData, options)
            .map(function (response) {
            var res = response.json();
            return res;
        });
    };
    return ParserService;
}());
ParserService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__http_service__["a" /* HttpService */]) === "function" && _a || Object])
], ParserService);

var _a;
//# sourceMappingURL=parser.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/services.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__http_service__ = __webpack_require__("../../../../../src/app/services/http.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__parser_service__ = __webpack_require__("../../../../../src/app/services/parser.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServicesModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ServicesModule = (function () {
    function ServicesModule() {
    }
    return ServicesModule;
}());
ServicesModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        providers: [
            __WEBPACK_IMPORTED_MODULE_1__http_service__["a" /* HttpService */],
            __WEBPACK_IMPORTED_MODULE_2__parser_service__["a" /* ParserService */]
        ]
    })
], ServicesModule);

//# sourceMappingURL=services.module.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: true,
    parserUploadUrl: "https://daoc-log-parse.herokuapp.com"
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map