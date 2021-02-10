/*
 * MolPaintJS
 * Copyright 2017 Leibniz-Institut f. Pflanzenbiochemie 
 *  
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 * http://www.mattgreer.org/articles/promises-in-wicked-detail/#defining-the-promise-type
 *
 * Rather simple Promise implementation for use in very 
 * old versions of Firefox. Current implementations do not 
 * require this module.
 */
function Promise(fn) {

	var state = 'pending';
	var value;
	var deferred;

	function resolve(newValue) {
		value = newValue;
		state = 'resolved';

		if(deferred) {
			handle(deferred);
		}
	}

	function handle(onResolved) {
		if(state === 'pending') {
			deferred = onResolved;
			return;
		}

		onResolved(value);
	}

	this.then = function(onResolved) {
		handle(onResolved);
	};

	fn(resolve);
}

