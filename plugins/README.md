* find-elem-mods-warns.js — show warnings for {elem,mods} in bem-xjst 6+ templates
* find-none-size-mod-blocks.js — show errors for {mods:{size}} in bem-xjst 6+ templates
* find-none-theme-mod-blocks.js — show errors for {mods:{theme}} in bem-xjst 6+ templates
* find-placeholder.js — show errors for placeholder in bem-xjst 6+ templates
* find-target-attrs-errors.js — show errors for target in bem-xjst 6+ templates

* find-mods-errors.js — common bem-xjst searchers lib

### Run example
```bash
MYPATH='**/*.js'
PATH=$PATH:path/to/plugins
echo elem mods; VERBOSE=1 LEVEL=error find-elem-mods-warns.js $MYPATH
echo theme; VERBOSE=1 LEVEL=error find-none-theme-mod-blocks.js $MYPATH
echo size; VERBOSE=1 LEVEL=error find-none-size-mod-blocks.js $MYPATH
echo target; VERBOSE=1 find-target-attrs-errors.js $MYPATH
echo placeholder; VERBOSE=1 find-placeholder.js $MYPATH
echo outer; VERBOSE=1 find-outer-mod-blocks.js $MYPATH
```
