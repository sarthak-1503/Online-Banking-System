# Do not edit. File was generated by node-gyp's "configure" step
{
  "target_defaults": {
    "cflags": [],
    "default_configuration": "Release",
    "defines": [],
    "include_dirs": [],
    "libraries": []
  },
  "variables": {
    "asan": 0,
    "coverage": "false",
    "dcheck_always_on": 0,
    "debug_nghttp2": "false",
    "debug_node": "false",
    "enable_lto": "false",
    "enable_pgo_generate": "false",
    "enable_pgo_use": "false",
    "error_on_warn": "false",
    "force_dynamic_crt": 0,
    "gas_version": "2.30",
    "host_arch": "x64",
    "icu_data_in": "../../deps/icu-tmp/icudt69l.dat",
    "icu_endianness": "l",
    "icu_gyp_path": "tools/icu/icu-generic.gyp",
    "icu_path": "deps/icu-small",
    "icu_small": "false",
    "icu_ver_major": "69",
    "is_debug": 0,
    "llvm_version": "0.0",
    "napi_build_version": "8",
    "node_byteorder": "little",
    "node_debug_lib": "false",
    "node_enable_d8": "false",
    "node_install_npm": "true",
    "node_library_files": [
      "lib/diagnostics_channel.js",
      "lib/path.js",
      "lib/punycode.js",
      "lib/events.js",
      "lib/_stream_wrap.js",
      "lib/querystring.js",
      "lib/_tls_common.js",
      "lib/_tls_wrap.js",
      "lib/assert.js",
      "lib/async_hooks.js",
      "lib/child_process.js",
      "lib/cluster.js",
      "lib/util.js",
      "lib/vm.js",
      "lib/worker_threads.js",
      "lib/_http_common.js",
      "lib/buffer.js",
      "lib/_http_server.js",
      "lib/wasi.js",
      "lib/process.js",
      "lib/console.js",
      "lib/constants.js",
      "lib/fs.js",
      "lib/dgram.js",
      "lib/dns.js",
      "lib/_stream_duplex.js",
      "lib/readline.js",
      "lib/module.js",
      "lib/domain.js",
      "lib/zlib.js",
      "lib/url.js",
      "lib/_stream_writable.js",
      "lib/http.js",
      "lib/https.js",
      "lib/inspector.js",
      "lib/trace_events.js",
      "lib/_http_incoming.js",
      "lib/http2.js",
      "lib/os.js",
      "lib/string_decoder.js",
      "lib/_stream_passthrough.js",
      "lib/_stream_readable.js",
      "lib/_stream_transform.js",
      "lib/crypto.js",
      "lib/timers.js",
      "lib/repl.js",
      "lib/_http_agent.js",
      "lib/_http_client.js",
      "lib/net.js",
      "lib/perf_hooks.js",
      "lib/v8.js",
      "lib/tty.js",
      "lib/sys.js",
      "lib/tls.js",
      "lib/stream.js",
      "lib/_http_outgoing.js",
      "lib/dns/promises.js",
      "lib/stream/consumers.js",
      "lib/stream/promises.js",
      "lib/stream/web.js",
      "lib/assert/strict.js",
      "lib/internal/async_hooks.js",
      "lib/internal/errors.js",
      "lib/internal/heap_utils.js",
      "lib/internal/blob.js",
      "lib/internal/options.js",
      "lib/internal/freeze_intrinsics.js",
      "lib/internal/inspector_async_hook.js",
      "lib/internal/linkedlist.js",
      "lib/internal/js_stream_socket.js",
      "lib/internal/url.js",
      "lib/internal/socketaddress.js",
      "lib/internal/util.js",
      "lib/internal/repl.js",
      "lib/internal/child_process.js",
      "lib/internal/event_target.js",
      "lib/internal/v8_prof_polyfill.js",
      "lib/internal/v8_prof_processor.js",
      "lib/internal/validators.js",
      "lib/internal/buffer.js",
      "lib/internal/encoding.js",
      "lib/internal/watchdog.js",
      "lib/internal/trace_events_async_hooks.js",
      "lib/internal/constants.js",
      "lib/internal/abort_controller.js",
      "lib/internal/blocklist.js",
      "lib/internal/querystring.js",
      "lib/internal/net.js",
      "lib/internal/cli_table.js",
      "lib/internal/fixed_queue.js",
      "lib/internal/priority_queue.js",
      "lib/internal/tty.js",
      "lib/internal/assert.js",
      "lib/internal/timers.js",
      "lib/internal/socket_list.js",
      "lib/internal/error_serdes.js",
      "lib/internal/freelist.js",
      "lib/internal/dgram.js",
      "lib/internal/histogram.js",
      "lib/internal/http.js",
      "lib/internal/idna.js",
      "lib/internal/worker.js",
      "lib/internal/dtrace.js",
      "lib/internal/stream_base_commons.js",
      "lib/internal/bootstrap/environment.js",
      "lib/internal/bootstrap/loaders.js",
      "lib/internal/bootstrap/pre_execution.js",
      "lib/internal/bootstrap/node.js",
      "lib/internal/bootstrap/switches/does_not_own_process_state.js",
      "lib/internal/bootstrap/switches/is_not_main_thread.js",
      "lib/internal/bootstrap/switches/does_own_process_state.js",
      "lib/internal/bootstrap/switches/is_main_thread.js",
      "lib/internal/debugger/inspect_repl.js",
      "lib/internal/debugger/inspect.js",
      "lib/internal/debugger/inspect_client.js",
      "lib/internal/cluster/shared_handle.js",
      "lib/internal/cluster/child.js",
      "lib/internal/cluster/primary.js",
      "lib/internal/cluster/round_robin_handle.js",
      "lib/internal/cluster/utils.js",
      "lib/internal/cluster/worker.js",
      "lib/internal/crypto/aes.js",
      "lib/internal/crypto/certificate.js",
      "lib/internal/crypto/cipher.js",
      "lib/internal/crypto/diffiehellman.js",
      "lib/internal/crypto/hash.js",
      "lib/internal/crypto/hashnames.js",
      "lib/internal/crypto/hkdf.js",
      "lib/internal/crypto/mac.js",
      "lib/internal/crypto/pbkdf2.js",
      "lib/internal/crypto/random.js",
      "lib/internal/crypto/scrypt.js",
      "lib/internal/crypto/sig.js",
      "lib/internal/crypto/util.js",
      "lib/internal/crypto/webcrypto.js",
      "lib/internal/crypto/x509.js",
      "lib/internal/crypto/dsa.js",
      "lib/internal/crypto/keygen.js",
      "lib/internal/crypto/rsa.js",
      "lib/internal/crypto/keys.js",
      "lib/internal/crypto/ec.js",
      "lib/internal/dns/promises.js",
      "lib/internal/dns/utils.js",
      "lib/internal/fs/dir.js",
      "lib/internal/fs/read_file_context.js",
      "lib/internal/fs/sync_write_stream.js",
      "lib/internal/fs/utils.js",
      "lib/internal/fs/watchers.js",
      "lib/internal/fs/streams.js",
      "lib/internal/fs/promises.js",
      "lib/internal/fs/rimraf.js",
      "lib/internal/fs/cp/cp-sync.js",
      "lib/internal/fs/cp/cp.js",
      "lib/internal/http2/compat.js",
      "lib/internal/http2/util.js",
      "lib/internal/http2/core.js",
      "lib/internal/modules/package_json_reader.js",
      "lib/internal/modules/run_main.js",
      "lib/internal/modules/cjs/helpers.js",
      "lib/internal/modules/cjs/loader.js",
      "lib/internal/modules/esm/loader.js",
      "lib/internal/modules/esm/get_source.js",
      "lib/internal/modules/esm/module_job.js",
      "lib/internal/modules/esm/module_map.js",
      "lib/internal/modules/esm/resolve.js",
      "lib/internal/modules/esm/translators.js",
      "lib/internal/modules/esm/transform_source.js",
      "lib/internal/modules/esm/create_dynamic_module.js",
      "lib/internal/modules/esm/get_format.js",
      "lib/internal/legacy/processbinding.js",
      "lib/internal/process/policy.js",
      "lib/internal/process/worker_thread_only.js",
      "lib/internal/process/per_thread.js",
      "lib/internal/process/promises.js",
      "lib/internal/process/report.js",
      "lib/internal/process/signal.js",
      "lib/internal/process/task_queues.js",
      "lib/internal/process/warning.js",
      "lib/internal/process/esm_loader.js",
      "lib/internal/process/execution.js",
      "lib/internal/repl/history.js",
      "lib/internal/repl/utils.js",
      "lib/internal/repl/await.js",
      "lib/internal/streams/legacy.js",
      "lib/internal/streams/passthrough.js",
      "lib/internal/streams/buffer_list.js",
      "lib/internal/streams/lazy_transform.js",
      "lib/internal/streams/state.js",
      "lib/internal/streams/transform.js",
      "lib/internal/streams/compose.js",
      "lib/internal/streams/pipeline.js",
      "lib/internal/streams/from.js",
      "lib/internal/streams/add-abort-signal.js",
      "lib/internal/streams/destroy.js",
      "lib/internal/streams/duplex.js",
      "lib/internal/streams/duplexify.js",
      "lib/internal/streams/end-of-stream.js",
      "lib/internal/streams/readable.js",
      "lib/internal/streams/utils.js",
      "lib/internal/streams/writable.js",
      "lib/internal/test/binding.js",
      "lib/internal/test/transfer.js",
      "lib/internal/util/comparisons.js",
      "lib/internal/util/debuglog.js",
      "lib/internal/util/inspect.js",
      "lib/internal/util/inspector.js",
      "lib/internal/util/iterable_weak_map.js",
      "lib/internal/util/types.js",
      "lib/internal/main/check_syntax.js",
      "lib/internal/main/eval_stdin.js",
      "lib/internal/main/prof_process.js",
      "lib/internal/main/run_main_module.js",
      "lib/internal/main/print_help.js",
      "lib/internal/main/repl.js",
      "lib/internal/main/inspect.js",
      "lib/internal/main/worker_thread.js",
      "lib/internal/main/eval_string.js",
      "lib/internal/tls/parse-cert-string.js",
      "lib/internal/tls/secure-context.js",
      "lib/internal/tls/secure-pair.js",
      "lib/internal/vm/module.js",
      "lib/internal/child_process/serialization.js",
      "lib/internal/per_context/domexception.js",
      "lib/internal/per_context/messageport.js",
      "lib/internal/per_context/primordials.js",
      "lib/internal/worker/io.js",
      "lib/internal/worker/js_transferable.js",
      "lib/internal/assert/calltracker.js",
      "lib/internal/assert/assertion_error.js",
      "lib/internal/perf/event_loop_delay.js",
      "lib/internal/perf/event_loop_utilization.js",
      "lib/internal/perf/nodetiming.js",
      "lib/internal/perf/observe.js",
      "lib/internal/perf/performance.js",
      "lib/internal/perf/performance_entry.js",
      "lib/internal/perf/timerify.js",
      "lib/internal/perf/usertiming.js",
      "lib/internal/perf/utils.js",
      "lib/internal/webstreams/encoding.js",
      "lib/internal/webstreams/queuingstrategies.js",
      "lib/internal/webstreams/readablestream.js",
      "lib/internal/webstreams/transfer.js",
      "lib/internal/webstreams/transformstream.js",
      "lib/internal/webstreams/util.js",
      "lib/internal/webstreams/writablestream.js",
      "lib/internal/source_map/source_map.js",
      "lib/internal/source_map/source_map_cache.js",
      "lib/internal/source_map/prepare_stack_trace.js",
      "lib/internal/console/global.js",
      "lib/internal/console/constructor.js",
      "lib/internal/readline/utils.js",
      "lib/internal/readline/callbacks.js",
      "lib/internal/readline/emitKeypressEvents.js",
      "lib/internal/policy/manifest.js",
      "lib/internal/policy/sri.js",
      "lib/fs/promises.js",
      "lib/util/types.js",
      "lib/path/posix.js",
      "lib/path/win32.js",
      "lib/timers/promises.js"
    ],
    "node_module_version": 93,
    "node_no_browser_globals": "false",
    "node_prefix": "/",
    "node_release_urlbase": "https://nodejs.org/download/release/",
    "node_section_ordering_info": "",
    "node_shared": "false",
    "node_shared_brotli": "false",
    "node_shared_cares": "false",
    "node_shared_http_parser": "false",
    "node_shared_libuv": "false",
    "node_shared_nghttp2": "false",
    "node_shared_nghttp3": "false",
    "node_shared_ngtcp2": "false",
    "node_shared_openssl": "false",
    "node_shared_zlib": "false",
    "node_tag": "",
    "node_target_type": "executable",
    "node_use_bundled_v8": "true",
    "node_use_dtrace": "false",
    "node_use_etw": "false",
    "node_use_node_code_cache": "true",
    "node_use_node_snapshot": "true",
    "node_use_openssl": "true",
    "node_use_v8_platform": "true",
    "node_with_ltcg": "false",
    "node_without_node_options": "false",
    "openssl_fips": "",
    "openssl_is_fips": "false",
    "openssl_quic": "true",
    "ossfuzz": "false",
    "shlib_suffix": "so.93",
    "target_arch": "x64",
    "v8_enable_31bit_smis_on_64bit_arch": 0,
    "v8_enable_gdbjit": 0,
    "v8_enable_i18n_support": 1,
    "v8_enable_inspector": 1,
    "v8_enable_lite_mode": 0,
    "v8_enable_object_print": 1,
    "v8_enable_pointer_compression": 0,
    "v8_enable_webassembly": 1,
    "v8_no_strict_aliasing": 1,
    "v8_optimized_debug": 1,
    "v8_promise_internal_field_count": 1,
    "v8_random_seed": 0,
    "v8_trace_maps": 0,
    "v8_use_siphash": 1,
    "want_separate_host_toolset": 0,
    "nodedir": "/home/sa-coder15/.cache/node-gyp/16.10.0",
    "standalone_static_library": 1,
    "cache_lock_stale": "60000",
    "ham_it_up": "",
    "legacy_bundling": "",
    "sign_git_tag": "",
    "user_agent": "npm/6.14.15 node/v16.10.0 linux x64",
    "always_auth": "",
    "bin_links": "true",
    "key": "",
    "allow_same_version": "",
    "description": "true",
    "fetch_retries": "2",
    "heading": "npm",
    "if_present": "",
    "init_version": "1.0.0",
    "user": "1000",
    "prefer_online": "",
    "force": "",
    "only": "",
    "read_only": "",
    "cache_min": "10",
    "init_license": "ISC",
    "editor": "vi",
    "rollback": "true",
    "tag_version_prefix": "v",
    "cache_max": "Infinity",
    "timing": "",
    "userconfig": "/home/sa-coder15/.npmrc",
    "engine_strict": "",
    "init_author_name": "",
    "init_author_url": "",
    "preid": "",
    "tmp": "/tmp",
    "depth": "Infinity",
    "package_lock_only": "",
    "save_dev": "",
    "usage": "",
    "metrics_registry": "https://registry.npmjs.org/",
    "otp": "",
    "package_lock": "true",
    "progress": "true",
    "https_proxy": "",
    "save_prod": "",
    "audit": "true",
    "cidr": "",
    "onload_script": "",
    "sso_type": "oauth",
    "rebuild_bundle": "true",
    "save_bundle": "",
    "shell": "/bin/bash",
    "prefix": "/home/sa-coder15/.npm-global",
    "dry_run": "",
    "format_package_lock": "true",
    "scope": "",
    "browser": "",
    "cache_lock_wait": "10000",
    "ignore_prepublish": "",
    "registry": "https://registry.npmjs.org/",
    "save_optional": "",
    "searchopts": "",
    "versions": "",
    "cache": "/home/sa-coder15/.npm",
    "send_metrics": "",
    "global_style": "",
    "ignore_scripts": "",
    "version": "",
    "local_address": "",
    "viewer": "man",
    "node_gyp": "/usr/local/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js",
    "audit_level": "low",
    "prefer_offline": "",
    "color": "true",
    "sign_git_commit": "",
    "fetch_retry_mintimeout": "10000",
    "maxsockets": "50",
    "offline": "",
    "sso_poll_frequency": "500",
    "umask": "0002",
    "fund": "true",
    "fetch_retry_maxtimeout": "60000",
    "logs_max": "10",
    "message": "%s",
    "ca": "",
    "cert": "",
    "global": "",
    "link": "",
    "access": "",
    "also": "",
    "save": "true",
    "unicode": "true",
    "before": "",
    "long": "",
    "production": "",
    "searchlimit": "20",
    "unsafe_perm": "true",
    "update_notifier": "true",
    "auth_type": "legacy",
    "node_version": "16.10.0",
    "tag": "latest",
    "git_tag_version": "true",
    "commit_hooks": "true",
    "script_shell": "",
    "shrinkwrap": "true",
    "fetch_retry_factor": "10",
    "save_exact": "",
    "strict_ssl": "true",
    "globalconfig": "/etc/npmrc",
    "dev": "",
    "init_module": "/home/sa-coder15/.npm-init.js",
    "parseable": "",
    "globalignorefile": "/etc/npmignore",
    "cache_lock_retries": "10",
    "searchstaleness": "900",
    "node_options": "",
    "save_prefix": "^",
    "scripts_prepend_node_path": "warn-only",
    "group": "1000",
    "init_author_email": "",
    "searchexclude": "",
    "git": "git",
    "optional": "true",
    "json": ""
  }
}