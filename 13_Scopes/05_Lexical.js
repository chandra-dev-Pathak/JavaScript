/*
-----------------------------------
 5. LEXICAL SCOPE (STATIC SCOPE)
-----------------------------------

 Meaning:
- "Lexical scope" means the scope of a variable is decided by *where it is written in the code*, not by where it is called.
- In simple words: "Location in the code decides the scope."
- JavaScript uses lexical (static) scoping, not dynamic scoping.
- Inner functions can access variables of their outer (parent) functions.
- Scope flows downward only, not upward.

-----------------------------------
 1. Basic Lexical Scope
-----------------------------------
*/

function outer() {
    let outerVar = "I am from outer function";

    function inner() {
        console.log(outerVar); // inner can access outerVar
    }

    inner();
}

outer();

/*
Explanation:
- inner() can use outerVar because of lexical scope.
- JavaScript checks where inner() was WRITTEN in code,
  not where it was called.

-----------------------------------
 2. Lexical Scope Chain
-----------------------------------
*/

let globalVar = "I am global";

function outerFunc() {
    let outerVar = "I am outer";

    function innerFunc() {
        let innerVar = "I am inner";

        console.log(globalVar); // from global scope
        console.log(outerVar);  // from parent scope
        console.log(innerVar);  // own scope
    }

    innerFunc();
}

outerFunc();

/*
Explanation:
- JavaScript searches variables through a "scope chain":
  Inner → Parent → Global

-----------------------------------
 3. Not Accessible Backwards
-----------------------------------
*/

function outer2() {
    let outerVar = "Outer";

    function inner2() {
        let innerVar = "Inner";
        console.log(outerVar); // can access parent
    }

    inner2();
    // console.log(innerVar); // Error: not accessible here
}

outer2();

/*
Explanation:
- Outer cannot access inner variables.
- Scope flows downward, not upward.

-----------------------------------
 4. Multiple Levels of Nesting
-----------------------------------
*/

function level1() {
    let var1 = "Level 1";

    function level2() {
        let var2 = "Level 2";

        function level3() {
            console.log(var1); // Accessible from level1
            console.log(var2); // Accessible from level2
        }

        level3();
    }

    level2();
}

level1();

/*
Explanation:
- No matter how deep the nesting is,
  inner functions can reach up the chain.

-----------------------------------
 5. Lexical Scope vs Dynamic Scope
-----------------------------------

 Wrong thinking (Dynamic Scope):
- Some languages use "dynamic scope" 
  (scope depends on who CALLS the function).
- But JS does NOT work like this.

 Lexical Scope in JS:
- Always depends on where the function is WRITTEN.

-----------------------------------
 Summary of Lexical Scope
-----------------------------------
- Scope depends on *where code is written*, not where it’s called.
- Inner functions can access variables of outer functions.
- Scope flows from inner → outer → global, not the reverse.
- JavaScript uses static (lexical) scope, not dynamic scope.
- Lexical scope is the foundation of Closures.

-----------------------------------
 Good Practices
-----------------------------------
- Use lexical scope to your advantage (nesting, closures).
- Don’t over-nest functions, or code gets confusing.
*/
