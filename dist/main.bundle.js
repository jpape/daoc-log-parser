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

module.exports = "<div style=\"padding-left:4ch; padding-top: 4ch\">\r\n\r\n    <input type=\"file\" (change)=\"fileSelected($event)\" placeholder=\"Select log file\" accept=\".log, .txt\">\r\n    <p *ngIf=\"isParsing\" style=\"color:red\">Parsing...</p>\r\n    <div *ngIf=\"resultsForPage\">\r\n        <br/>\r\n        <br/>\r\n        <p>Results for logfile: {{logFileName}}</p>\r\n    </div>\r\n    <br/>\r\n    <br/>\r\n\r\n    <div id=\"instructions\" *ngIf=\"!resultsForPage\">\r\n        <h2>How to save a chatlog:</h2>\r\n        <ol>\r\n            <li>Enable chatlogs in game by using the command '/chatlog'</li>\r\n            <ul>\r\n                <li>This causes all text to be output to a file named 'chat.log', which by default is located at 'C:/Documents/Electronic\r\n                    Arts/Dark Age of Camelot</li>\r\n            </ul>\r\n            <li>You can write to a differently named file by using '/chatlog [name]' (Replace [name] with whatever you want to name the file)</li>\r\n            <ul>\r\n                <li>If the file [name].log exists, the game will open the file and append your chatlog to the end of it.</li>\r\n                <li>If the file [name].log doesn't exist, the game will create it for you</li>\r\n            </ul>\r\n            <li>Quitting to character screen, going link-dead, or typing /chatlog again will turn off the logging.</li>\r\n        </ol>\r\n    </div>\r\n\r\n    <mat-tab-group (selectedTabChange)=\"tabChange($event)\" *ngIf=\"resultsForPage\">\r\n        <mat-tab label=\"Combat\" [disabled]=\"!resultsIncludeCombat\">\r\n            <mat-accordion multi=\"true\" hideToggle=\"true\">\r\n                <div class=\"container-fluid\">\r\n                    <div class=\"panel-group\">\r\n                        <mat-expansion-panel id=\"healing-rvr\" *ngIf=\"resultsIncludeRvr\">\r\n                            <mat-expansion-panel-header>\r\n                                <h4>Summary</h4>\r\n                            </mat-expansion-panel-header>\r\n                            <div class=\"row panel-default panel\" *ngIf=\"resultsForPage.Combat.Healing.Delivered || resultsForPage.Combat.Healing.Received || resultsForPage.Combat.Healing.Lifetapped\">\r\n                                <div class=\"col-xs-2\" id=\"healing-summary\">\r\n                                    <h4>Healing</h4>\r\n                                    <table style=\"border-top:1px solid black;\">\r\n                                        <tr *ngIf=\"resultsForPage.Combat.Healing.Delivered\">\r\n                                            <td>\r\n                                                <strong>Delivered:</strong>\r\n                                            </td>\r\n                                            <td style=\"text-align:center\">{{resultsForPage.Combat.Healing.Delivered | number}}</td>\r\n                                        </tr>\r\n                                        <tr *ngIf=\"resultsForPage.Combat.Healing.Received\">\r\n                                            <td>\r\n                                                <strong>Received:</strong>\r\n                                            </td>\r\n                                            <td style=\"text-align:center\">{{resultsForPage.Combat.Healing.Received | number}}</td>\r\n                                        </tr>\r\n                                        <tr *ngIf=\"resultsForPage.Combat.Healing.Lifetapped\">\r\n                                            <td>\r\n                                                <strong>Lifetapped:</strong>\r\n                                            </td>\r\n                                            <td style=\"text-align:center\">{{resultsForPage.Combat.Healing.Lifetapped | number}}</td>\r\n                                        </tr>\r\n                                    </table>\r\n                                </div>\r\n                                <div class=\"col-xs-3\" id=\"healing-delivered\" *ngIf=\"resultsForPage.Combat.Healing.Targets.length\">\r\n                                    <thead>\r\n                                        <strong>Delivered breakdown:</strong>\r\n                                    </thead>\r\n                                    <div class=\"scrollTable\">\r\n                                        <table class=\"table-striped greenStriped\">\r\n                                            <tr>\r\n                                                <th></th>\r\n                                                <th style=\"text-align:center\">Count</th>\r\n                                                <th style=\"text-align:center\">Total</th>\r\n                                                <th style=\"text-align:center\">Max</th>\r\n                                            </tr>\r\n                                            <tr *ngFor=\"let target of resultsForPage.Combat.Healing.Targets\">\r\n                                                <td>\r\n                                                    {{target[0]}}\r\n                                                    <a *ngIf=\"checkIfNameIsPlayer(target[0])\" href=\"http://herald.uthgard.net/herald.php?view=stats&p1=player&p2=Player&p3=DESC&p5=Player&p6={{target[0]}}\"\r\n                                                        target=\"_blank\"> (herald)</a>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{target[1] | number}}</td>\r\n                                                <td style=\"text-align:center\">{{target[2] | number}}</td>\r\n                                                <td style=\"text-align:center\">{{target[3] | number}}</td>\r\n                                            </tr>\r\n                                        </table>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-3\" id=\"healing-received\" *ngIf=\"resultsForPage.Combat.Healing.Sources.length\">\r\n                                    <thead>\r\n                                        <strong>Received breakdown:</strong>\r\n                                    </thead>\r\n                                    <div class=\"scrollTable\">\r\n                                        <table class=\"table-striped greenStriped\">\r\n                                            <tr>\r\n                                                <th></th>\r\n                                                <th style=\"text-align:center\">Count</th>\r\n                                                <th style=\"text-align:center\">Total</th>\r\n                                                <th style=\"text-align:center\">Max</th>\r\n                                            </tr>\r\n                                            <tr *ngFor=\"let source of resultsForPage.Combat.Healing.Sources\">\r\n                                                <td>\r\n                                                    {{source[0]}}\r\n                                                    <a *ngIf=\"checkIfNameIsPlayer(source[0])\" href=\"http://herald.uthgard.net/herald.php?view=stats&p1=player&p2=Player&p3=DESC&p5=Player&p6={{source[0]}}\"\r\n                                                        target=\"_blank\"> (herald)</a>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{source[1] | number}}</td>\r\n                                                <td style=\"text-align:center\">{{source[2] | number}}</td>\r\n                                                <td style=\"text-align:center\">{{source[3] | number}}</td>\r\n                                            </tr>\r\n                                        </table>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <br/>\r\n                            <div class=\"row panel-default panel\" *ngIf=\"resultsForPage.Combat.Summary.RPs || resultsForPage.Combat.Summary.Deaths\">\r\n                                <div class=\"col-xs-2\" id=\"rvr-summary\">\r\n                                    <h4>RvR</h4>\r\n                                    <table style=\"border-top:1px solid black;\">\r\n                                        <tr>\r\n                                            <td>\r\n                                                <strong>Deaths:</strong>\r\n                                            </td>\r\n                                            <td style=\"text-align:center\">{{resultsForPage.Combat.Summary.Deaths | number}}</td>\r\n                                        </tr>\r\n                                        <tr>\r\n                                            <td>\r\n                                                <strong>RPs:</strong>\r\n                                            </td>\r\n                                            <td style=\"text-align:center\">{{resultsForPage.Combat.Summary.RPs | number}}</td>\r\n                                        </tr>\r\n                                        <tr>\r\n                                            <td>\r\n                                                <strong>Deathblows:</strong>\r\n                                            </td>\r\n                                            <td style=\"text-align:center\">{{resultsForPage.Combat.Summary.DeathblowCount | number}}</td>\r\n                                        </tr>\r\n                                    </table>\r\n                                </div>\r\n                                <div class=\"col-xs-2\" *ngIf=\"resultsForPage.Combat.Summary.DeathblowCount > 0\">\r\n                                    <thead>\r\n                                        <strong>Deathblow list:</strong>\r\n                                    </thead>\r\n                                    <div class=\"scrollTable\" id=\"deathblow-list\" style=\"max-height:140px\">\r\n                                        <table class=\"table-striped greenStriped\">\r\n                                            <tr *ngFor=\"let db of resultsForPage.Combat.Summary.DeathBlows\">\r\n                                                <td>\r\n                                                    {{db[0]}}\r\n                                                    <a *ngIf=\"checkIfNameIsPlayer(db[0])\" href=\"http://herald.uthgard.net/herald.php?view=stats&p1=player&p2=Player&p3=DESC&p5=Player&p6={{db[0]}}\"\r\n                                                        target=\"_blank\"> (herald)</a>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{db[1] | number}}</td>\r\n                                            </tr>\r\n                                        </table>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </mat-expansion-panel>\r\n                        <mat-expansion-panel id=\"physical-caster-attack\">\r\n                            <mat-expansion-panel-header>\r\n                                <h4>Offense</h4>\r\n                            </mat-expansion-panel-header>\r\n                            <div class=\"row panel-default panel\">\r\n                                <h4 class=\"panel-heading\">Physical Attack</h4>\r\n                                <div class=\"panel-body\">\r\n                                    <div class=\"col-xs-2\" id=\"physical-summary\">\r\n                                        <h4>\r\n                                            <strong>Summary:</strong>\r\n                                        </h4>\r\n                                        <table class=\"table-striped blueStriped\">\r\n                                            <tr>\r\n                                                <td></td>\r\n                                                <th style=\"text-align:center\">Count</th>\r\n                                                <th style=\"text-align:center\">Percent</th>\r\n                                            </tr>\r\n                                            <tr *ngIf=\"resultsForPage.Combat.PhysicalAttack.Hits\">\r\n                                                <td>\r\n                                                    <strong>Hit:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.PhysicalAttack.Hits | number}}</td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.PhysicalAttack.Percents.Hits | percent}}</td>\r\n                                            </tr>\r\n                                            <tr *ngIf=\"resultsForPage.Combat.PhysicalAttack.Blocks\">\r\n                                                <td>\r\n                                                    <strong>Blocked:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.PhysicalAttack.Blocks | number}}</td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.PhysicalAttack.Percents.Blocks | percent}}</td>\r\n                                            </tr>\r\n                                            <tr *ngIf=\"resultsForPage.Combat.PhysicalAttack.Parries\">\r\n                                                <td>\r\n                                                    <strong>Parried:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.PhysicalAttack.Parries | number}}</td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.PhysicalAttack.Percents.Parries | percent}}</td>\r\n                                            </tr>\r\n                                            <tr *ngIf=\"resultsForPage.Combat.PhysicalAttack.Evades\">\r\n                                                <td>\r\n                                                    <strong>Evaded:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.PhysicalAttack.Evades | number}}</td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.PhysicalAttack.Percents.Evades | percent}}</td>\r\n                                            </tr>\r\n                                            <tr *ngIf=\"resultsForPage.Combat.PhysicalAttack.Misses\">\r\n                                                <td>\r\n                                                    <strong>Missed:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.PhysicalAttack.Misses | number}}</td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.PhysicalAttack.Percents.Misses | percent}}</td>\r\n                                            </tr>\r\n                                            <tr *ngIf=\"resultsForPage.Combat.PhysicalAttack.Bladeturns\">\r\n                                                <td>\r\n                                                    <strong>Bladeturned:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.PhysicalAttack.Bladeturns | number}}</td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.PhysicalAttack.Percents.Bladeturns | percent}}</td>\r\n                                            </tr>\r\n                                            <tr *ngIf=\"resultsForPage.Combat.PhysicalAttack.Fumbles\">\r\n                                                <td>\r\n                                                    <strong>Fumbled:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.PhysicalAttack.Fumbles | number}}</td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.PhysicalAttack.Percents.Fumbles | percent}}</td>\r\n                                            </tr>\r\n                                            <tr>\r\n                                                <td>\r\n                                                    <strong>Total Attacks:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.PhysicalAttack.TotalAttacks | number}}</td>\r\n                                                <td></td>\r\n                                            </tr>\r\n                                            <tr>\r\n                                                <td>\r\n                                                    <strong>Base Dmg:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.PhysicalAttack.BaseDamage | number}}</td>\r\n                                                <td></td>\r\n                                            </tr>\r\n                                            <tr *ngIf=\"resultsForPage.Combat.PhysicalAttack.Absorbed\">\r\n                                                <td>\r\n                                                    <strong>Dmg Absorbed:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.PhysicalAttack.Absorbed | number}}</td>\r\n                                                <td></td>\r\n                                            </tr>\r\n                                            <tr *ngIf=\"resultsForPage.Combat.PhysicalAttack.Crits\">\r\n                                                <td>\r\n                                                    <strong>Crits:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.PhysicalAttack.Crits | number}}</td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.PhysicalAttack.Percents.Crits | percent}}</td>\r\n                                            </tr>\r\n                                            <tr *ngIf=\"resultsForPage.Combat.PhysicalAttack.Crits\">\r\n                                                <td>\r\n                                                    <strong>Crit Dmg:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.PhysicalAttack.CritDamage | number}}</td>\r\n                                                <td></td>\r\n                                            </tr>\r\n                                            <tr *ngIf=\"resultsForPage.Combat.PhysicalAttack.Procs\">\r\n                                                <td>\r\n                                                    <strong>Procs:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.PhysicalAttack.Procs | number}}</td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.PhysicalAttack.Percents.Procs | percent}}</td>\r\n                                            </tr>\r\n                                            <tr *ngIf=\"resultsForPage.Combat.PhysicalAttack.Procs\">\r\n                                                <td>\r\n                                                    <strong>Proc Dmg:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.PhysicalAttack.ProcDamage | number}}</td>\r\n                                                <td></td>\r\n                                            </tr>\r\n                                            <tr>\r\n                                                <td>\r\n                                                    <strong>Total Dmg:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.PhysicalAttack.TotalDamage | number}}</td>\r\n                                                <td></td>\r\n                                            </tr>\r\n                                        </table>\r\n                                    </div>\r\n                                    <div class=\"col-xs-6\" id=\"physical-target-breakdown\">\r\n                                        <div *ngIf=\"resultsForPage.Combat.PhysicalAttack.Targets.length\">\r\n                                            <h4>\r\n                                                <strong>Targets:</strong>\r\n                                            </h4>\r\n                                            <div class=\"scrollTable\" style=\"max-height:200px\">\r\n                                                <table class=\"table-striped greenStriped\">\r\n                                                    <tr>\r\n                                                        <th></th>\r\n                                                        <th style=\"text-align:center\">Hits</th>\r\n                                                        <th style=\"text-align:center\">Blocks</th>\r\n                                                        <th style=\"text-align:center\">Parries</th>\r\n                                                        <th style=\"text-align:center\">Evades</th>\r\n                                                        <th style=\"text-align:center\">Crits</th>\r\n                                                        <th style=\"text-align:center\">Crit Dmg</th>\r\n                                                        <th style=\"text-align:center\">Procs</th>\r\n                                                        <th style=\"text-align:center\">Proc Dmg</th>\r\n                                                        <th style=\"text-align:center\">Min</th>\r\n                                                        <th style=\"text-align:center\">Max</th>\r\n                                                        <th style=\"text-align:center\">Total Dmg</th>\r\n                                                        <th style=\"text-align:center\">Avg</th>\r\n                                                    </tr>\r\n                                                    <tr *ngFor=\"let dmgTarget of resultsForPage.Combat.PhysicalAttack.Targets\">\r\n                                                        <td>\r\n                                                            {{dmgTarget[0]}}\r\n                                                            <a *ngIf=\"checkIfNameIsPlayer(dmgTarget[0])\" href=\"http://herald.uthgard.net/herald.php?view=stats&p1=player&p2=Player&p3=DESC&p5=Player&p6={{dmgTarget[0]}}\"\r\n                                                                target=\"_blank\"> (herald)</a>\r\n                                                        </td>\r\n                                                        <td *ngFor=\"let stat of dmgTarget.slice(1)\" style=\"text-align:center; border-left:1px black solid\">\r\n                                                            {{stat | number}}\r\n                                                        </td>\r\n                                                        <td style=\"text-align:center; border-left:1px black solid\">{{dmgTarget[11]/dmgTarget[1] | number:'.0-0'}}</td>\r\n                                                    </tr>\r\n                                                </table>\r\n                                            </div>\r\n                                        </div>\r\n                                        <br/>\r\n                                        <div id=\"physical-weapon-stats\" *ngIf=\"resultsForPage.Combat.PhysicalAttack.WeaponStats.length\">\r\n                                            <h4>\r\n                                                <strong>Weapon Stats:</strong>\r\n                                            </h4>\r\n                                            <div class=\"scrollTable\">\r\n                                                <table class=\"table-striped greenStriped\">\r\n                                                    <tr>\r\n                                                        <th></th>\r\n                                                        <th style=\"text-align:center\">Count</th>\r\n                                                        <th style=\"text-align:center\">Crits</th>\r\n                                                        <th style=\"text-align:center\">Crit Dmg</th>\r\n                                                        <th style=\"text-align:center\">Procs</th>\r\n                                                        <th style=\"text-align:center\">Proc Dmg</th>\r\n                                                        <th style=\"text-align:center\">Min Dmg</th>\r\n                                                        <th style=\"text-align:center\">Max Dmg</th>\r\n                                                        <th style=\"text-align:center\">Total Dmg</th>\r\n                                                        <th style=\"text-align:center\">Avg</th>\r\n\r\n                                                    </tr>\r\n                                                    <tr *ngFor=\"let style of resultsForPage.Combat.PhysicalAttack.WeaponStats\">\r\n                                                        <td>{{style[0]}}</td>\r\n                                                        <td *ngFor=\"let stat of style.slice(1)\" style=\"text-align:center; border-left:1px black solid\">\r\n                                                            {{stat | number}}\r\n                                                        </td>\r\n                                                        <td style=\"text-align:center; border-left:1px black solid\">\r\n                                                            {{style[8]/style[1] | number:'.0-0'}}\r\n                                                        </td>\r\n                                                    </tr>\r\n                                                </table>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"col-xs-4\" id=\"physical-style-weapon-stats\">\r\n                                        <div id=\"physical-style-stats\" *ngIf=\"resultsForPage.Combat.PhysicalAttack.StyleStats.length\">\r\n                                            <h4>\r\n                                                <strong>Style Stats:</strong>\r\n                                            </h4>\r\n                                            <table class=\"table-striped greenStriped\">\r\n                                                <tr>\r\n                                                    <th></th>\r\n                                                    <th style=\"text-align:center\">Count</th>\r\n                                                    <th style=\"text-align:center\">Avg (+Dmg)</th>\r\n                                                    <th style=\"text-align:center\">Min Dmg</th>\r\n                                                    <th style=\"text-align:center\">Max Dmg</th>\r\n                                                    <th style=\"text-align:center\">Total Dmg</th>\r\n                                                    <th style=\"text-align:center\">Avg Dmg</th>\r\n                                                </tr>\r\n                                                <tr *ngFor=\"let style of resultsForPage.Combat.PhysicalAttack.StyleStats\">\r\n                                                    <td>{{style[0]}}</td>\r\n                                                    <td *ngFor=\"let stats of style.slice(1)\" style=\"text-align:center; border-left:1px black solid\">\r\n                                                        {{stats | number}}\r\n                                                    </td>\r\n                                                    <td style=\"text-align:center; border-left:1px black solid\">{{style[5]/style[1] | number:'.0-0'}}</td>\r\n                                                </tr>\r\n                                            </table>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"row panel panel-default\">\r\n                                <h3 class=\"panel-heading\">Caster Attack</h3>\r\n                                <div class=\"panel-body\">\r\n                                    <div class=\"col-xs-2\" id=\"caster-summary\">\r\n                                        <h4>\r\n                                            <strong>Summary:</strong>\r\n                                        </h4>\r\n                                        <table class=\"table-striped blueStriped\">\r\n                                            <tr>\r\n                                                <th></th>\r\n                                                <th style=\"text-align:center\">\r\n                                                    <strong>Count</strong>\r\n                                                </th>\r\n                                                <th style=\"text-align:center\">\r\n                                                    <strong>Percent</strong>\r\n                                                </th>\r\n                                            </tr>\r\n                                            <tr>\r\n                                                <td>\r\n                                                    <strong>Landed:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.CasterAttack.Landed | number}}</td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.CasterAttack.Percents.Landed | percent}}</td>\r\n                                            </tr>\r\n                                            <tr>\r\n                                                <td>\r\n                                                    <strong>Resisted:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.CasterAttack.Resists | number}}</td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.CasterAttack.Percents.Resists | percent}}</td>\r\n                                            </tr>\r\n                                            <tr>\r\n                                                <td>\r\n                                                    <strong>Total Attacks:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.CasterAttack.TotalAttacks | number}}</td>\r\n                                                <td></td>\r\n                                            </tr>\r\n                                            <tr>\r\n                                                <td>\r\n                                                    <strong>Base Dmg:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.CasterAttack.BaseDamage | number}}</td>\r\n                                                <td></td>\r\n                                            </tr>\r\n                                            <tr>\r\n                                                <td>\r\n                                                    <strong>Crits:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.CasterAttack.Crits | number}}</td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.CasterAttack.Percents.Crits | percent}}</td>\r\n                                            </tr>\r\n                                            <tr>\r\n                                                <td>\r\n                                                    <strong>Crit Dmg:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.CasterAttack.CritDamage | number}}</td>\r\n                                                <td></td>\r\n                                            </tr>\r\n                                            <tr>\r\n                                                <td>\r\n                                                    <strong>Total Dmg:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.CasterAttack.TotalDamage | number}}</td>\r\n                                                <td></td>\r\n                                            </tr>\r\n                                        </table>\r\n                                    </div>\r\n                                    <div class=\"col-xs-5\" id=\"caster-damage-breakdown\">\r\n                                        <div *ngIf=\"resultsForPage.Combat.CasterAttack.Targets.length\">\r\n                                            <h4>\r\n                                                <strong>Targets:</strong>\r\n                                            </h4>\r\n                                            <div class=\"scrollTable\">\r\n                                                <table class=\"table-striped greenStriped\">\r\n                                                    <tr>\r\n                                                        <th></th>\r\n                                                        <th style=\"text-align:center\">Landed</th>\r\n                                                        <th style=\"text-align:center\">Resisted</th>\r\n                                                        <th style=\"text-align:center\">Crit</th>\r\n                                                        <th style=\"text-align:center\">Crit Dmg</th>\r\n                                                        <th style=\"text-align:center\">Min Dmg</th>\r\n                                                        <th style=\"text-align:center\">Max Dmg</th>\r\n                                                        <th style=\"text-align:center\">Total Dmg</th>\r\n                                                    </tr>\r\n                                                    <tr *ngFor=\"let dmgTarget of resultsForPage.Combat.CasterAttack.Targets\">\r\n                                                        <td>\r\n                                                            {{dmgTarget[0]}}\r\n                                                            <a *ngIf=\"checkIfNameIsPlayer(dmgTarget[0])\" href=\"http://herald.uthgard.net/herald.php?view=stats&p1=player&p2=Player&p3=DESC&p5=Player&p6={{dmgTarget[0]}}\"\r\n                                                                target=\"_blank\"> (herald)</a>\r\n                                                        </td>\r\n                                                        <td *ngFor=\"let stat of dmgTarget.slice(1)\" style=\"text-align:center; border-left:1px black solid\">\r\n                                                            {{stat | number}}\r\n                                                        </td>\r\n                                                    </tr>\r\n                                                </table>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"col-xs-5\" id=\"caster-spell-stats\">\r\n                                        <div *ngIf=\"resultsForPage.Combat.CasterAttack.SpellStats.length > 0\">\r\n                                            <h4>\r\n                                                <strong>Spell Stats:</strong>\r\n                                            </h4>\r\n                                            <div class=\"scrollTable\" style=\"max-height:160px\">\r\n                                                <table class=\"table-striped greenStriped\">\r\n                                                    <tr>\r\n                                                        <th></th>\r\n                                                        <th style=\"text-align:center\">Landed</th>\r\n                                                        <th style=\"text-align:center\">Resisted</th>\r\n                                                        <th style=\"text-align:center\">Crit</th>\r\n                                                        <th style=\"text-align:center\">Crit Dmg</th>\r\n                                                        <th style=\"text-align:center\">Min Dmg</th>\r\n                                                        <th style=\"text-align:center\">Max Dmg</th>\r\n                                                        <th style=\"text-align:center\">Total Dmg</th>\r\n                                                    </tr>\r\n                                                    <tr *ngFor=\"let spell of resultsForPage.Combat.CasterAttack.SpellStats\">\r\n                                                        <td>{{spell[0]}}</td>\r\n                                                        <td *ngFor=\"let stat of spell.slice(1)\" style=\"text-align:center; border-left:1px black solid\">\r\n                                                            {{stat | number}}\r\n                                                        </td>\r\n                                                    </tr>\r\n                                                </table>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <br/>\r\n                            <div class=\"row panel panel-default\" *ngIf=\"resultsForPage.Combat.CasterAttack.TotalAttacks || resultsForPage.Combat.PhysicalAttack.TotalAttacks\">\r\n                                <h4 class=\"panel-heading\">DPS Graph (Average damage per attack: {{resultsForPage.Combat.DPS | number:'.0-2'}})</h4>\r\n                                <p style=\"color:red\">Clicking on a bar will copy the timestamp to your clipboard, making it easier to find the events in your log file</p>\r\n                                <div class=\"col-md-12 panel-body\">\r\n                                    <div style=\"display:block;\">\r\n                                        <canvas baseChart height=\"60\"\r\n                                            [datasets]=\"dpsChartData\"\r\n                                            [labels]=\"dpsChartLabels\"\r\n                                            [options]=\"dpsChartOptions\"\r\n                                            [chartType]=\"'bar'\"\r\n                                            [colors]=\"dpsChartColors\"\r\n                                            [legend]=\"dpsLegend\"\r\n                                            (chartClick)=\"dpsChartClicked($event)\"></canvas>\r\n                                    </div>\r\n                                    <!-- <ngx-charts-bar-vertical\r\n                                        [results]=\"dpsChartData\"\r\n                                        [yAxis]=\"'true'\"\r\n                                        [xAxis]=\"'true'\"\r\n                                        [barPadding]=\"0\"\r\n                                        [showXAxisLabel]=\"'true'\">\r\n                                    </ngx-charts-bar-vertical> -->\r\n                                </div>\r\n                            </div>\r\n                        </mat-expansion-panel>\r\n                        <mat-expansion-panel id=\"defense\">\r\n                            <mat-expansion-panel-header>\r\n                                <h4>Defense</h4>\r\n                            </mat-expansion-panel-header>\r\n                            <div class=\"row panel panel-default\">\r\n                                <div class=\"panel-body\">\r\n                                    <div class=\"col-xs-2\" id=\"defense-summary\">\r\n                                        <h4>\r\n                                            <strong>Summary:</strong>\r\n                                        </h4>\r\n                                        <table class=\"table-striped blueStriped\">\r\n                                            <tr>\r\n                                                <th></th>\r\n                                                <th style=\"text-align: center\">\r\n                                                    <strong>Count</strong>\r\n                                                </th>\r\n                                                <th style=\"text-align: center\">\r\n                                                    <strong>Percent</strong>\r\n                                                </th>\r\n                                            </tr>\r\n                                            <tr *ngIf=\"resultsForPage.Combat.Defense.Hits\">\r\n                                                <td>\r\n                                                    <strong>Hits:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.Defense.Hits | number}}</td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.Defense.Percents.Hits | percent}}</td>\r\n                                            </tr>\r\n                                            <tr *ngIf=\"resultsForPage.Combat.Defense.Blocks\">\r\n                                                <td>\r\n                                                    <strong>Blocks:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.Defense.Blocks | number}}</td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.Defense.Percents.Blocks | percent}}</td>\r\n                                            </tr>\r\n                                            <tr *ngIf=\"resultsForPage.Combat.Defense.Parries\">\r\n                                                <td>\r\n                                                    <strong>Parries:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.Defense.Parries | number}}</td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.Defense.Percents.Parries | percent}}</td>\r\n                                            </tr>\r\n                                            <tr *ngIf=\"resultsForPage.Combat.Defense.Evades\">\r\n                                                <td>\r\n                                                    <strong>Evades:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.Defense.Evades | number}}</td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.Defense.Percents.Evades | percent}}</td>\r\n                                            </tr>\r\n                                            <tr *ngIf=\"resultsForPage.Combat.Defense.Misses\">\r\n                                                <td>\r\n                                                    <strong>Misses:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.Defense.Misses | number}}</td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.Defense.Percents.Misses | percent}}</td>\r\n                                            </tr>\r\n                                            <tr *ngIf=\"resultsForPage.Combat.Defense.Intercepts\">\r\n                                                <td>\r\n                                                    <strong>Intercepts:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.Defense.Intercepts | number}}</td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.Defense.Percents.Intercepts | percent}}</td>\r\n                                            </tr>\r\n                                            <tr>\r\n                                                <td>\r\n                                                    <strong>Tot Physical Attacks:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.Defense.TotalPhysicalAttacks | number}}</td>\r\n                                                <td></td>\r\n                                            </tr>\r\n                                            <tr *ngIf=\"resultsForPage.Combat.Defense.Crits\">\r\n                                                <td>\r\n                                                    <strong>Crits:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.Defense.Crits | number}}</td>\r\n                                                <td></td>\r\n                                            </tr>\r\n                                            <tr *ngIf=\"resultsForPage.Combat.Defense.Crits\">\r\n                                                <td>\r\n                                                    <strong>Crit Dmg:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.Defense.CritDamage | number}}</td>\r\n                                                <td></td>\r\n                                            </tr>\r\n                                            <tr *ngIf=\"resultsForPage.Combat.Defense.PhysicalDamage\">\r\n                                                <td>\r\n                                                    <strong>Physical Dmg:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.Defense.PhysicalDamage | number}}</td>\r\n                                                <td></td>\r\n                                            </tr>\r\n                                            <tr *ngIf=\"resultsForPage.Combat.Defense.Absorbed\">\r\n                                                <td>\r\n                                                    <strong>Dmg Absorbed:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.Defense.Absorbed | number}}</td>\r\n                                                <td></td>\r\n                                            </tr>\r\n                                            <tr *ngIf=\"resultsForPage.Combat.Defense.SpellsLanded\">\r\n                                                <td>\r\n                                                    <strong>Spells/Procs:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.Defense.SpellsLanded | number}}</td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.Defense.Percents.SpellsLanded | percent}}</td>\r\n                                            </tr>\r\n                                            <tr *ngIf=\"resultsForPage.Combat.Defense.Resists\">\r\n                                                <td>\r\n                                                    <strong>Resists:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.Defense.Resists | number}}</td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.Defense.Percents.Resists | percent}}</td>\r\n                                            </tr>\r\n                                            <tr>\r\n                                                <td>\r\n                                                    <strong>Tot Magic Attacks:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.Defense.TotalSpellAttacks | number}}</td>\r\n                                                <td></td>\r\n                                            </tr>\r\n                                            <tr *ngIf=\"resultsForPage.Combat.Defense.SpellDamage\">\r\n                                                <td>\r\n                                                    <strong>Spell Dmg:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.Defense.SpellDamage | number}}</td>\r\n                                                <td></td>\r\n                                            </tr>\r\n                                            <tr>\r\n                                                <td>\r\n                                                    <strong>Total Dmg:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.Defense.TotalDamage | number}}</td>\r\n                                                <td></td>\r\n                                            </tr>\r\n                                            <tr *ngIf=\"resultsForPage.Combat.Defense.Guarding_Blocked\">\r\n                                                <td>\r\n                                                    <strong>Guarding Blocks:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.Defense.Guarding_Blocked | number}}</td>\r\n                                                <td></td>\r\n                                            </tr>\r\n                                            <tr *ngIf=\"resultsForPage.Combat.Defense.Guarded_Blocked\">\r\n                                                <td>\r\n                                                    <strong>Guarded Blocks:</strong>\r\n                                                </td>\r\n                                                <td style=\"text-align:center\">{{resultsForPage.Combat.Defense.Guarded_Blocked | number}}</td>\r\n                                                <td></td>\r\n                                            </tr>\r\n                                        </table>\r\n                                    </div>\r\n                                    <div class=\"col-xs-5\" id=\"defense-damage-breakdown\">\r\n                                        <div *ngIf=\"resultsForPage.Combat.Defense.Sources.length\">\r\n                                            <h4>\r\n                                                <strong>Damage Sources:</strong>\r\n                                            </h4>\r\n                                            <div class=\"scrollTable\" style=\"max-height:320px\">\r\n                                                <table class=\"table-striped greenStriped\">\r\n                                                    <tr>\r\n                                                        <th></th>\r\n                                                        <th style=\"text-align:center\">Attacks</th>\r\n                                                        <th style=\"text-align:center\">Hits</th>\r\n                                                        <th style=\"text-align:center\">Blocks</th>\r\n                                                        <th style=\"text-align:center\">Parries</th>\r\n                                                        <th style=\"text-align:center\">Evades</th>\r\n                                                        <th style=\"text-align:center\">Misses</th>\r\n                                                        <th style=\"text-align:center\">Crits</th>\r\n                                                        <th style=\"text-align:center\">Damage</th>\r\n                                                    </tr>\r\n                                                    <tr *ngFor=\"let dmgSource of resultsForPage.Combat.Defense.Sources\">\r\n                                                        <td>\r\n                                                            {{dmgSource[0]}}\r\n                                                            <a *ngIf=\"checkIfNameIsPlayer(dmgSource[0])\" href=\"http://herald.uthgard.net/herald.php?view=stats&p1=player&p2=Player&p3=DESC&p5=Player&p6={{dmgSource[0]}}\"\r\n                                                                target=\"_blank\"> (herald)</a>\r\n                                                        </td>\r\n\r\n                                                        <td *ngFor=\"let stat of dmgSource.slice(1)\" style=\"text-align:center; border-left:1px black solid\">\r\n                                                            {{stat | number}}\r\n                                                        </td>\r\n                                                    </tr>\r\n                                                </table>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"col-xs-2\" id=\"defense-armor-hits\">\r\n                                        <div *ngIf=\"resultsForPage.Combat.Defense.Hits > 0\">\r\n                                            <h4>\r\n                                                <strong>Armor Hits:</strong>\r\n                                            </h4>\r\n                                            <table class=\"table-striped greenStriped\">\r\n                                                <tr>\r\n                                                    <th></th>\r\n                                                    <th style=\"text-align:center\">Hits</th>\r\n                                                    <th style=\"text-align:center\">Percent</th>\r\n                                                    <th style=\"text-align:center\">Damage</th>\r\n                                                </tr>\r\n                                                <tr *ngFor=\"let armor of resultsForPage.Combat.Defense.ArmorHits\">\r\n                                                    <td>{{armor[0]}}</td>\r\n                                                    <td style=\"text-align:center\">{{armor[1] | number}}</td>\r\n                                                    <td style=\"text-align:center\">{{(armor[1]/resultsForPage.Combat.Defense.Hits) | percent:'.0-2'}}</td>\r\n                                                    <td style=\"text-align:center\">{{armor[2] | number}}</td>\r\n                                                </tr>\r\n                                            </table>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </mat-expansion-panel>\r\n                        <div id=\"errors\" class=\"col-xs-4 row panel-default panel\" *ngIf=\"errorMessageList.length > 0\">\r\n                            <h3 class=\"panel-heading\">Parsing Errors</h3>\r\n                            <div class=\"panel-body\">\r\n                                <ul>\r\n                                    <li *ngFor=\"let todo of errorMessageList\">{{todo}}</li>\r\n                                </ul>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <!-- <div class=\"example-container mat-elevation-z8\">\r\n                    <mat-table #table [dataSource]=\"matTableTest\">\r\n                        <ng-container matColumnDef=\"name\">\r\n                            <mat-header-cell *matHeaderCellDef></mat-header-cell>\r\n                            <mat-cell *matCellDef=\"let target\">{{target[0]}}</mat-cell>\r\n                        </ng-container>\r\n                        <ng-container matColumnDef=\"hits\">\r\n                            <mat-header-cell *matHeaderCellDef>Hits</mat-header-cell>\r\n                            <mat-cell *matCellDef=\"let target\">{{target[1]}}</mat-cell>\r\n                        </ng-container>\r\n                        <ng-container matColumnDef=\"blocks\">\r\n                            <mat-header-cell *matHeaderCellDef>Blocks</mat-header-cell>\r\n                            <mat-cell *matCellDef=\"let target\">{{target[2]}}</mat-cell>\r\n                        </ng-container>\r\n\r\n                        <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n                        <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n                    </mat-table>\r\n                </div> -->\r\n                <!-- <div class=\"example-container mat-elevation-z8\">\r\n                    <mat-table #table [dataSource]=\"matTableTest\">\r\n                        <ng-container matColumnDef=\"{{header}}\" *ngFor=\"let header of displayedColumns; let i = index\">\r\n                            <mat-header-cell *matHeaderCellDef>{{header}}</mat-header-cell>\r\n                            <mat-cell *matCellDef=\"let target\">{{target[i] | number}}</mat-cell>\r\n                        </ng-container>\r\n\r\n\r\n                        <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n                        <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n                    </mat-table>\r\n                </div> -->\r\n            </mat-accordion>\r\n        </mat-tab>\r\n        <mat-tab label=\"Money & Loot\" [disabled]=\"(resultsForPage.PvE.Drops.length == 0 && !resultsIncludeMoney)\">\r\n            <div class=\"row\" *ngIf=\"resultsIncludeMoney\">\r\n                <div class=\"col-xs-2\" id=\"money-summary\">\r\n                    <h4>Money</h4>\r\n                    <table style=\"border-top:1px solid black;\">\r\n                        <tr *ngIf=\"currencyPrintHelper(resultsForPage.PvE.Monies.Loot) != ''\">\r\n                            <td>\r\n                                <strong>Looted:</strong>\r\n                            </td>\r\n                            <td style=\"text-align:center\">{{currencyPrintHelper(resultsForPage.PvE.Monies.Loot)}}</td>\r\n                        </tr>\r\n                        <tr *ngIf=\"currencyPrintHelper(resultsForPage.PvE.Monies.Expense) != ''\">\r\n                            <td>\r\n                                <strong>Expenses:</strong>\r\n                            </td>\r\n                            <td style=\"text-align:center\">{{currencyPrintHelper(resultsForPage.PvE.Monies.Expense)}}</td>\r\n                        </tr>\r\n                        <tr *ngIf=\"currencyPrintHelper(resultsForPage.PvE.Monies.Income) != ''\">\r\n                            <td>\r\n                                <strong>Income:</strong>\r\n                            </td>\r\n                            <td style=\"text-align:center\">{{currencyPrintHelper(resultsForPage.PvE.Monies.Income)}}</td>\r\n                        </tr>\r\n                    </table>\r\n                </div>\r\n            </div>\r\n            <br/>\r\n            <br/>\r\n            <div class=\"row\">\r\n                <div class=\"container-fluid\">\r\n                    <div class=\"col-sm-3 panel-default panel\" *ngFor=\"let mobs of resultsForPage.PvE.Drops\">\r\n                        <h4 class=\"panel-header\">{{mobs[0]}} (Kills: {{mobs[1]}})</h4>\r\n                        <table class=\"table-striped bluestriped panel-body\">\r\n                            <tr>\r\n                                <th>Item</th>\r\n                                <th style=\"text-align: center\">Count</th>\r\n                                <th style=\"text-align: center\">Rate</th>\r\n                            </tr>\r\n                            <tr *ngFor=\"let drop of mobs[2]\">\r\n                                <td>{{drop[0]}}</td>\r\n                                <td style=\"text-align: center\">{{drop[1]}}</td>\r\n                                <td style=\"text-align: center\">{{drop[1]/mobs[1] | percent:'.0-0'}}</td>\r\n                            </tr>\r\n                        </table>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </mat-tab>\r\n        <mat-tab label=\"XP\" [disabled]=\"resultsForPage.PvE.XP.length == 0\">\r\n            <!-- <ngx-charts-area-chart-stacked\r\n                [results]=\"xpChartData\" \r\n                [yAxis]=\"'true'\"\r\n                [xAxis]=\"'true'\"\r\n                [legend]=\"'true'\"\r\n                [scheme]=\"xpChartColors\">\r\n            </ngx-charts-area-chart-stacked> -->\r\n            <ngx-charts-bar-vertical-stacked\r\n                [results]=\"xpChartData\" \r\n                [yAxis]=\"'true'\"\r\n                [xAxis]=\"xpShowXAxis\"\r\n                [legend]=\"'true'\"\r\n                [scheme]=\"xpChartColors\"\r\n                [barPadding]=\"1\">\r\n            </ngx-charts-bar-vertical-stacked>\r\n        </mat-tab>\r\n        <mat-tab label=\"Crafting\" [disabled]=\"resultsForPage.Crafting.Series.length == 0\">\r\n            <ngx-charts-bar-vertical-2d \r\n                [results]=\"craftingChartData\" \r\n                [legend]=\"'true'\"\r\n                [legendTitle]=\"'Items'\"\r\n                [yAxis]=\"'true'\"\r\n                [xAxis]=\"'true'\"\r\n                [groupPadding]=\"12\"\r\n                [barPadding]=\"1\"\r\n                [showXAxisLabel]=\"'true'\">\r\n            </ngx-charts-bar-vertical-2d>\r\n        </mat-tab>\r\n        <mat-tab label=\"Log File\" *ngIf=\"currentlyParsedFile\" style=\"height:100%\">\r\n            <button type=\"button\" (click)=\"showLogFile()\" *ngIf=\"!showingLogFile\">Show log file</button>\r\n            <textarea *ngIf=\"logFileContent\" class=\"panel panel-default\" readonly=\"true\" style=\"width:100%; height:700px\">\r\n                {{logFileContent}}\r\n            </textarea>\r\n        </mat-tab>\r\n    </mat-tab-group>\r\n\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_parser_service__ = __webpack_require__("../../../../../src/app/services/parser.service.ts");
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
    function AppComponent(parserService) {
        this.parserService = parserService;
        this.TODO = [
            'Guard blocks',
            'Guarded blocks',
            'Pet intercepts',
            'Guild tax'
        ];
        this.fileExt = ["txt, log"];
        this.API_VERSION = 'v2.0';
        this.dpsChartData = [];
        this.dpsChartLabels = [];
        this.dpsChartOptions = {
            scaleShowVerticalLines: true,
            responsive: true
        };
        this.dpsChartColors = [
            {
                backgroundColor: '#4286f4',
                borderColor: '#4286f4',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ];
        this.dpsLegend = false;
        this.craftingChartData = [];
        this.craftingLabels = ['Fail', '94', '95', '96', '97', '98', '99', '100'];
        this.xpChartData = [];
        this.xpChartColors = {
            domain: ['#156489', '#b57506', '#dd8e07', '#f8ac29', '#fac364', '#fbd491', '#fde5bd', '#dc0d0e']
        };
        this.xpShowXAxis = true;
        this.errorMessageList = [];
        this.isParsing = false;
        this.logFileName = '';
        this.logFileContent = '';
        this.showingLogFile = false;
        this.resultsIncludeCombat = false;
        this.resultsIncludeMoney = false;
        this.resultsIncludeRvr = false;
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent.prototype.pushDataToCharts = function (castedResults) {
        var _this = this;
        this.dpsChartData = [{ data: castedResults.Combat.ChartData.Values, label: 'Total Dmg' }];
        setTimeout(function () { _this.dpsChartLabels = castedResults.Combat.ChartData.Labels; }, 50);
        var tmpData = [];
        for (var i = 0; i < this.craftingLabels.length; i++) {
            var series = [];
            for (var x = 0; x < castedResults.Crafting.Series.length; x++) {
                series.push({
                    "name": castedResults.Crafting.Series[x],
                    "value": castedResults.Crafting.Values[x][i]
                });
            }
            tmpData.push({
                "name": this.craftingLabels[i],
                "series": series
            });
        }
        this.craftingChartData = tmpData;
        this.xpChartData = castedResults.PvE.XP;
        this.xpShowXAxis = castedResults.PvE.XP.length < 75;
    };
    AppComponent.prototype.checkResultsForCombat = function (castedResults) {
        var hasPhysical = castedResults.Combat.PhysicalAttack.TotalAttacks > 0;
        var hasCasting = castedResults.Combat.CasterAttack.TotalAttacks > 0;
        var hasDefense = castedResults.Combat.Defense.TotalAttacks > 0;
        var hasHealing = this.checkResultsForRvr(castedResults);
        return hasPhysical || hasCasting || hasDefense || hasHealing;
    };
    AppComponent.prototype.checkResultsForMoney = function (castedResults) {
        var hasMoneyValue = false;
        castedResults.PvE.Monies.Loot.forEach(function (denom) {
            if (denom) {
                hasMoneyValue = true;
            }
        });
        if (hasMoneyValue) {
            return true;
        }
        castedResults.PvE.Monies.Expense.forEach(function (denom) {
            if (denom) {
                hasMoneyValue = true;
            }
        });
        if (hasMoneyValue) {
            return true;
        }
        castedResults.PvE.Monies.Income.forEach(function (denom) {
            if (denom) {
                hasMoneyValue = true;
            }
        });
        return hasMoneyValue;
    };
    AppComponent.prototype.checkResultsForRvr = function (castedResults) {
        var containsHealing = castedResults.Combat.Healing.Delivered > 0
            || castedResults.Combat.Healing.Received > 0
            || castedResults.Combat.Healing.Lifetapped > 0;
        var containsDeathRpsKills = castedResults.Combat.Summary.Deaths > 0
            || castedResults.Combat.Summary.RPs > 0
            || castedResults.Combat.Summary.DeathblowCount > 0;
        return containsHealing || containsDeathRpsKills;
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
    AppComponent.prototype.dpsChartClicked = function (ev) {
        var ts = this.dpsChartLabels[ev.active[0]._index];
        document.addEventListener('copy', function (e) {
            e.clipboardData.setData('text/plain', ts);
            e.preventDefault();
        });
        document.execCommand('copy');
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
    AppComponent.prototype.tabChange = function (event) {
        if (event.tab.textLabel == 'Crafting' || event.tab.textLabel == 'XP') {
            window.dispatchEvent(new Event('resize'));
        }
    };
    AppComponent.prototype.fileSelected = function (event) {
        var _this = this;
        this.showingLogFile = false;
        this.logFileContent = '';
        var fileList = event.target.files;
        if (fileList.length > 0) {
            this.currentlyParsedFile = fileList[0];
            this.logFileName = this.currentlyParsedFile.name;
            this.isParsing = true;
            this.parserService.sendFileToParse(this.currentlyParsedFile, this.API_VERSION)
                .subscribe(function (results) {
                _this.isParsing = false;
                if (results['Errors']) {
                    alert('This page is out of date. Please refresh the page and try again. \rWindows key combination: Ctrl + F5');
                }
                else {
                    var messages = results['Messages'];
                    if (messages) {
                        _this.errorMessageList = messages;
                    }
                    var castedResults = results;
                    if (castedResults) {
                        _this.resultsForPage = castedResults;
                        _this.pushDataToCharts(castedResults);
                        _this.resultsIncludeCombat = _this.checkResultsForCombat(castedResults);
                        _this.resultsIncludeMoney = _this.checkResultsForMoney(castedResults);
                        _this.resultsIncludeRvr = _this.checkResultsForRvr(castedResults);
                    }
                }
            }, function (error) {
                alert('Error parsing your log file. Please try again. If the problem persists, please contact system admin.');
                _this.isParsing = false;
                _this.resultsForPage = null;
            });
        }
    };
    AppComponent.prototype.showLogFile = function () {
        this.logFileContent = 'Loading...';
        this.showingLogFile = true;
        var reader = new FileReader();
        reader.readAsText(this.currentlyParsedFile);
        var me = this;
        reader.onload = function () {
            me.logFileContent = reader.result;
        };
    };
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_parser_service__["a" /* ParserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_parser_service__["a" /* ParserService */]) === "function" && _a || Object])
    ], AppComponent);
    return AppComponent;
    var _a;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_charts__ = __webpack_require__("../../../../ng2-charts/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__swimlane_ngx_charts__ = __webpack_require__("../../../../@swimlane/ngx-charts/release/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__swimlane_ngx_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__swimlane_ngx_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_material_tabs__ = __webpack_require__("../../../material/esm5/tabs.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_material_expansion__ = __webpack_require__("../../../material/esm5/expansion.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_services_module__ = __webpack_require__("../../../../../src/app/services/services.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
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
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* AppComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["BrowserModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_9__services_services_module__["a" /* ServicesModule */],
                __WEBPACK_IMPORTED_MODULE_4_ng2_charts__["ChartsModule"],
                __WEBPACK_IMPORTED_MODULE_8__angular_material_expansion__["a" /* MatExpansionModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material_tabs__["a" /* MatTabsModule */],
                __WEBPACK_IMPORTED_MODULE_5__swimlane_ngx_charts__["NgxChartsModule"],
                __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/services/http.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
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
            responseSubject.error(err);
        }, function () {
            responseSubject.complete();
        });
        // Do not expose the ISubscription portion of Subject
        return responseSubject.asObservable();
    };
    HttpService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === "function" && _a || Object])
    ], HttpService);
    return HttpService;
    var _a;
}());

//# sourceMappingURL=http.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/parser.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
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
    ParserService.prototype.sendFileToParse = function (file, api_version) {
        var formData = new FormData();
        formData.append('logfile', file, file.name);
        var optHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        optHeaders.append('Accept', 'application/json');
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: optHeaders });
        return this.httpService.post(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].parserUploadUrl + "/upload/" + api_version, formData, options)
            .map(function (response) {
            var res = response.json();
            return res;
        });
    };
    ParserService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__http_service__["a" /* HttpService */]) === "function" && _a || Object])
    ], ParserService);
    return ParserService;
    var _a;
}());

//# sourceMappingURL=parser.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/services.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
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
    ServicesModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            providers: [
                __WEBPACK_IMPORTED_MODULE_1__http_service__["a" /* HttpService */],
                __WEBPACK_IMPORTED_MODULE_2__parser_service__["a" /* ParserService */]
            ]
        })
    ], ServicesModule);
    return ServicesModule;
}());

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "../../../../moment/locale recursive ^\\.\\/.*$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "../../../../moment/locale/af.js",
	"./af.js": "../../../../moment/locale/af.js",
	"./ar": "../../../../moment/locale/ar.js",
	"./ar-dz": "../../../../moment/locale/ar-dz.js",
	"./ar-dz.js": "../../../../moment/locale/ar-dz.js",
	"./ar-kw": "../../../../moment/locale/ar-kw.js",
	"./ar-kw.js": "../../../../moment/locale/ar-kw.js",
	"./ar-ly": "../../../../moment/locale/ar-ly.js",
	"./ar-ly.js": "../../../../moment/locale/ar-ly.js",
	"./ar-ma": "../../../../moment/locale/ar-ma.js",
	"./ar-ma.js": "../../../../moment/locale/ar-ma.js",
	"./ar-sa": "../../../../moment/locale/ar-sa.js",
	"./ar-sa.js": "../../../../moment/locale/ar-sa.js",
	"./ar-tn": "../../../../moment/locale/ar-tn.js",
	"./ar-tn.js": "../../../../moment/locale/ar-tn.js",
	"./ar.js": "../../../../moment/locale/ar.js",
	"./az": "../../../../moment/locale/az.js",
	"./az.js": "../../../../moment/locale/az.js",
	"./be": "../../../../moment/locale/be.js",
	"./be.js": "../../../../moment/locale/be.js",
	"./bg": "../../../../moment/locale/bg.js",
	"./bg.js": "../../../../moment/locale/bg.js",
	"./bn": "../../../../moment/locale/bn.js",
	"./bn.js": "../../../../moment/locale/bn.js",
	"./bo": "../../../../moment/locale/bo.js",
	"./bo.js": "../../../../moment/locale/bo.js",
	"./br": "../../../../moment/locale/br.js",
	"./br.js": "../../../../moment/locale/br.js",
	"./bs": "../../../../moment/locale/bs.js",
	"./bs.js": "../../../../moment/locale/bs.js",
	"./ca": "../../../../moment/locale/ca.js",
	"./ca.js": "../../../../moment/locale/ca.js",
	"./cs": "../../../../moment/locale/cs.js",
	"./cs.js": "../../../../moment/locale/cs.js",
	"./cv": "../../../../moment/locale/cv.js",
	"./cv.js": "../../../../moment/locale/cv.js",
	"./cy": "../../../../moment/locale/cy.js",
	"./cy.js": "../../../../moment/locale/cy.js",
	"./da": "../../../../moment/locale/da.js",
	"./da.js": "../../../../moment/locale/da.js",
	"./de": "../../../../moment/locale/de.js",
	"./de-at": "../../../../moment/locale/de-at.js",
	"./de-at.js": "../../../../moment/locale/de-at.js",
	"./de-ch": "../../../../moment/locale/de-ch.js",
	"./de-ch.js": "../../../../moment/locale/de-ch.js",
	"./de.js": "../../../../moment/locale/de.js",
	"./dv": "../../../../moment/locale/dv.js",
	"./dv.js": "../../../../moment/locale/dv.js",
	"./el": "../../../../moment/locale/el.js",
	"./el.js": "../../../../moment/locale/el.js",
	"./en-au": "../../../../moment/locale/en-au.js",
	"./en-au.js": "../../../../moment/locale/en-au.js",
	"./en-ca": "../../../../moment/locale/en-ca.js",
	"./en-ca.js": "../../../../moment/locale/en-ca.js",
	"./en-gb": "../../../../moment/locale/en-gb.js",
	"./en-gb.js": "../../../../moment/locale/en-gb.js",
	"./en-ie": "../../../../moment/locale/en-ie.js",
	"./en-ie.js": "../../../../moment/locale/en-ie.js",
	"./en-nz": "../../../../moment/locale/en-nz.js",
	"./en-nz.js": "../../../../moment/locale/en-nz.js",
	"./eo": "../../../../moment/locale/eo.js",
	"./eo.js": "../../../../moment/locale/eo.js",
	"./es": "../../../../moment/locale/es.js",
	"./es-do": "../../../../moment/locale/es-do.js",
	"./es-do.js": "../../../../moment/locale/es-do.js",
	"./es.js": "../../../../moment/locale/es.js",
	"./et": "../../../../moment/locale/et.js",
	"./et.js": "../../../../moment/locale/et.js",
	"./eu": "../../../../moment/locale/eu.js",
	"./eu.js": "../../../../moment/locale/eu.js",
	"./fa": "../../../../moment/locale/fa.js",
	"./fa.js": "../../../../moment/locale/fa.js",
	"./fi": "../../../../moment/locale/fi.js",
	"./fi.js": "../../../../moment/locale/fi.js",
	"./fo": "../../../../moment/locale/fo.js",
	"./fo.js": "../../../../moment/locale/fo.js",
	"./fr": "../../../../moment/locale/fr.js",
	"./fr-ca": "../../../../moment/locale/fr-ca.js",
	"./fr-ca.js": "../../../../moment/locale/fr-ca.js",
	"./fr-ch": "../../../../moment/locale/fr-ch.js",
	"./fr-ch.js": "../../../../moment/locale/fr-ch.js",
	"./fr.js": "../../../../moment/locale/fr.js",
	"./fy": "../../../../moment/locale/fy.js",
	"./fy.js": "../../../../moment/locale/fy.js",
	"./gd": "../../../../moment/locale/gd.js",
	"./gd.js": "../../../../moment/locale/gd.js",
	"./gl": "../../../../moment/locale/gl.js",
	"./gl.js": "../../../../moment/locale/gl.js",
	"./gom-latn": "../../../../moment/locale/gom-latn.js",
	"./gom-latn.js": "../../../../moment/locale/gom-latn.js",
	"./he": "../../../../moment/locale/he.js",
	"./he.js": "../../../../moment/locale/he.js",
	"./hi": "../../../../moment/locale/hi.js",
	"./hi.js": "../../../../moment/locale/hi.js",
	"./hr": "../../../../moment/locale/hr.js",
	"./hr.js": "../../../../moment/locale/hr.js",
	"./hu": "../../../../moment/locale/hu.js",
	"./hu.js": "../../../../moment/locale/hu.js",
	"./hy-am": "../../../../moment/locale/hy-am.js",
	"./hy-am.js": "../../../../moment/locale/hy-am.js",
	"./id": "../../../../moment/locale/id.js",
	"./id.js": "../../../../moment/locale/id.js",
	"./is": "../../../../moment/locale/is.js",
	"./is.js": "../../../../moment/locale/is.js",
	"./it": "../../../../moment/locale/it.js",
	"./it.js": "../../../../moment/locale/it.js",
	"./ja": "../../../../moment/locale/ja.js",
	"./ja.js": "../../../../moment/locale/ja.js",
	"./jv": "../../../../moment/locale/jv.js",
	"./jv.js": "../../../../moment/locale/jv.js",
	"./ka": "../../../../moment/locale/ka.js",
	"./ka.js": "../../../../moment/locale/ka.js",
	"./kk": "../../../../moment/locale/kk.js",
	"./kk.js": "../../../../moment/locale/kk.js",
	"./km": "../../../../moment/locale/km.js",
	"./km.js": "../../../../moment/locale/km.js",
	"./kn": "../../../../moment/locale/kn.js",
	"./kn.js": "../../../../moment/locale/kn.js",
	"./ko": "../../../../moment/locale/ko.js",
	"./ko.js": "../../../../moment/locale/ko.js",
	"./ky": "../../../../moment/locale/ky.js",
	"./ky.js": "../../../../moment/locale/ky.js",
	"./lb": "../../../../moment/locale/lb.js",
	"./lb.js": "../../../../moment/locale/lb.js",
	"./lo": "../../../../moment/locale/lo.js",
	"./lo.js": "../../../../moment/locale/lo.js",
	"./lt": "../../../../moment/locale/lt.js",
	"./lt.js": "../../../../moment/locale/lt.js",
	"./lv": "../../../../moment/locale/lv.js",
	"./lv.js": "../../../../moment/locale/lv.js",
	"./me": "../../../../moment/locale/me.js",
	"./me.js": "../../../../moment/locale/me.js",
	"./mi": "../../../../moment/locale/mi.js",
	"./mi.js": "../../../../moment/locale/mi.js",
	"./mk": "../../../../moment/locale/mk.js",
	"./mk.js": "../../../../moment/locale/mk.js",
	"./ml": "../../../../moment/locale/ml.js",
	"./ml.js": "../../../../moment/locale/ml.js",
	"./mr": "../../../../moment/locale/mr.js",
	"./mr.js": "../../../../moment/locale/mr.js",
	"./ms": "../../../../moment/locale/ms.js",
	"./ms-my": "../../../../moment/locale/ms-my.js",
	"./ms-my.js": "../../../../moment/locale/ms-my.js",
	"./ms.js": "../../../../moment/locale/ms.js",
	"./my": "../../../../moment/locale/my.js",
	"./my.js": "../../../../moment/locale/my.js",
	"./nb": "../../../../moment/locale/nb.js",
	"./nb.js": "../../../../moment/locale/nb.js",
	"./ne": "../../../../moment/locale/ne.js",
	"./ne.js": "../../../../moment/locale/ne.js",
	"./nl": "../../../../moment/locale/nl.js",
	"./nl-be": "../../../../moment/locale/nl-be.js",
	"./nl-be.js": "../../../../moment/locale/nl-be.js",
	"./nl.js": "../../../../moment/locale/nl.js",
	"./nn": "../../../../moment/locale/nn.js",
	"./nn.js": "../../../../moment/locale/nn.js",
	"./pa-in": "../../../../moment/locale/pa-in.js",
	"./pa-in.js": "../../../../moment/locale/pa-in.js",
	"./pl": "../../../../moment/locale/pl.js",
	"./pl.js": "../../../../moment/locale/pl.js",
	"./pt": "../../../../moment/locale/pt.js",
	"./pt-br": "../../../../moment/locale/pt-br.js",
	"./pt-br.js": "../../../../moment/locale/pt-br.js",
	"./pt.js": "../../../../moment/locale/pt.js",
	"./ro": "../../../../moment/locale/ro.js",
	"./ro.js": "../../../../moment/locale/ro.js",
	"./ru": "../../../../moment/locale/ru.js",
	"./ru.js": "../../../../moment/locale/ru.js",
	"./sd": "../../../../moment/locale/sd.js",
	"./sd.js": "../../../../moment/locale/sd.js",
	"./se": "../../../../moment/locale/se.js",
	"./se.js": "../../../../moment/locale/se.js",
	"./si": "../../../../moment/locale/si.js",
	"./si.js": "../../../../moment/locale/si.js",
	"./sk": "../../../../moment/locale/sk.js",
	"./sk.js": "../../../../moment/locale/sk.js",
	"./sl": "../../../../moment/locale/sl.js",
	"./sl.js": "../../../../moment/locale/sl.js",
	"./sq": "../../../../moment/locale/sq.js",
	"./sq.js": "../../../../moment/locale/sq.js",
	"./sr": "../../../../moment/locale/sr.js",
	"./sr-cyrl": "../../../../moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "../../../../moment/locale/sr-cyrl.js",
	"./sr.js": "../../../../moment/locale/sr.js",
	"./ss": "../../../../moment/locale/ss.js",
	"./ss.js": "../../../../moment/locale/ss.js",
	"./sv": "../../../../moment/locale/sv.js",
	"./sv.js": "../../../../moment/locale/sv.js",
	"./sw": "../../../../moment/locale/sw.js",
	"./sw.js": "../../../../moment/locale/sw.js",
	"./ta": "../../../../moment/locale/ta.js",
	"./ta.js": "../../../../moment/locale/ta.js",
	"./te": "../../../../moment/locale/te.js",
	"./te.js": "../../../../moment/locale/te.js",
	"./tet": "../../../../moment/locale/tet.js",
	"./tet.js": "../../../../moment/locale/tet.js",
	"./th": "../../../../moment/locale/th.js",
	"./th.js": "../../../../moment/locale/th.js",
	"./tl-ph": "../../../../moment/locale/tl-ph.js",
	"./tl-ph.js": "../../../../moment/locale/tl-ph.js",
	"./tlh": "../../../../moment/locale/tlh.js",
	"./tlh.js": "../../../../moment/locale/tlh.js",
	"./tr": "../../../../moment/locale/tr.js",
	"./tr.js": "../../../../moment/locale/tr.js",
	"./tzl": "../../../../moment/locale/tzl.js",
	"./tzl.js": "../../../../moment/locale/tzl.js",
	"./tzm": "../../../../moment/locale/tzm.js",
	"./tzm-latn": "../../../../moment/locale/tzm-latn.js",
	"./tzm-latn.js": "../../../../moment/locale/tzm-latn.js",
	"./tzm.js": "../../../../moment/locale/tzm.js",
	"./uk": "../../../../moment/locale/uk.js",
	"./uk.js": "../../../../moment/locale/uk.js",
	"./ur": "../../../../moment/locale/ur.js",
	"./ur.js": "../../../../moment/locale/ur.js",
	"./uz": "../../../../moment/locale/uz.js",
	"./uz-latn": "../../../../moment/locale/uz-latn.js",
	"./uz-latn.js": "../../../../moment/locale/uz-latn.js",
	"./uz.js": "../../../../moment/locale/uz.js",
	"./vi": "../../../../moment/locale/vi.js",
	"./vi.js": "../../../../moment/locale/vi.js",
	"./x-pseudo": "../../../../moment/locale/x-pseudo.js",
	"./x-pseudo.js": "../../../../moment/locale/x-pseudo.js",
	"./yo": "../../../../moment/locale/yo.js",
	"./yo.js": "../../../../moment/locale/yo.js",
	"./zh-cn": "../../../../moment/locale/zh-cn.js",
	"./zh-cn.js": "../../../../moment/locale/zh-cn.js",
	"./zh-hk": "../../../../moment/locale/zh-hk.js",
	"./zh-hk.js": "../../../../moment/locale/zh-hk.js",
	"./zh-tw": "../../../../moment/locale/zh-tw.js",
	"./zh-tw.js": "../../../../moment/locale/zh-tw.js"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../../../../moment/locale recursive ^\\.\\/.*$";

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map